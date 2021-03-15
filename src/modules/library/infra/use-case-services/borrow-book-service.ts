import { Result } from "typescript-result";
import bookAlreadyBorrowedError from "../../domain/errors/book/book-already-borrowed-error";
import BookDoesntExistError from "../../domain/errors/book/book-doesnt-exist-error";
import customerDoesntExistError from "../../domain/errors/customer/customer-doesnt-exist-error";
import IBorrowBookService from "../../use-cases/borrow-book/i-borrow-book-service";
import BookDto from "../../use-cases/dto/borrow-book/book-dto";
import BorrowalDto from '../../use-cases/dto/borrow-book/borrowal-dto';
import customerBorrowalsDto from "../../use-cases/dto/borrow-book/customer-borrowals-dto";
import Book from "../data/entities/book";
import IGetByIdRepo from "../data/repo/common/i-get-by-id-repo";
import ICustomerBorrowalsRepo from "../data/repo/i-customer-borrowals-repo";
import CustomerBorrowalsDto from '../../use-cases/dto/borrow-book/customer-borrowals-dto';
import Customer from "../data/entities/customer";
import CustomerDoesntExistError from "../../domain/errors/customer/customer-doesnt-exist-error";
import CustomerBorrowal from "../data/entities/customer-borrowal";
import BorrowalStatus from '../data/entities/borrowal-status';
import CustomerBorrowalReturnDto from "../data/repo/dto/customer-borrowal-return-dto";

export default class BorrowBookService implements IBorrowBookService {

    private _readableRookRepo: IGetByIdRepo<number, Book>;
    private _customerBorrowalRepo: ICustomerBorrowalsRepo;
    private _readableCustomerRepo: IGetByIdRepo<number, Customer>;

    constructor(readableRookRepo: IGetByIdRepo<number, Book>, customerBorrowalRepo: ICustomerBorrowalsRepo, readableCustomerRepo: IGetByIdRepo<number, Customer>) {
        this._readableRookRepo = readableRookRepo;
        this._customerBorrowalRepo = customerBorrowalRepo;
        this._readableCustomerRepo = readableCustomerRepo;
    }

    /**
     * Get Book with if its borrowed or not status.
     * @param bookId 
     */
    async getBookById(bookId: number): Promise<Result<BookDoesntExistError | Error, BookDto>> {
        try {
            // TODO The implementation here could have been done using a single database call rather than 2 as you can see below.
            // TODO Refactor and generalize the validations if possible to reduce boilerplate

            // get latest borrowal record if there is any
            const borrowalRecordResponse = await this._customerBorrowalRepo.getBookLatestBorrowal(bookId);

            if (borrowalRecordResponse.isFailure()) {
                return Result.error(borrowalRecordResponse.error);
            }

            if (borrowalRecordResponse.value !== undefined) {
                const borrowalRecord = borrowalRecordResponse.value;

                if (bookId !== borrowalRecord.book.id || borrowalRecord.borrowalStatus === undefined || borrowalRecord.borrowalStatus === null) {
                    return Result.error(new Error("Returning book didnt have a matching book id or borrowal status was undefined or null."));
                }

                return Result.ok(new BookDto(bookId, borrowalRecord.borrowalStatus.isBorrowed()))
            }

            // if no borrowal record, check if the book exists and create the record
            const bookResponse = await this._readableRookRepo.getById(bookId);

            if (bookResponse.isFailure()) {
                return Result.error(bookResponse.error)
            }

            const book = bookResponse.value;

            if (!book) {
                return Result.error(new BookDoesntExistError(`Book ${bookId} doesn't exist.`));
            }

            if (bookId !== book.id) {
                return Result.error(new Error("Returning book didnt have a matching book id"));
            }

            return Result.ok(new BookDto(book.id, false));

        } catch (error) {
            return Result.error(error);
        }
    }

    async getCustomerBorrowalsById(customerId: number): Promise<Result<Error | customerDoesntExistError, customerBorrowalsDto>> {

        try {
            // get active customer borrowals by id
            const customerBorrowalsResponse = await this._customerBorrowalRepo.getActiveCustomerBorrowalsById(customerId);

            if (customerBorrowalsResponse.isFailure()) {
                return Result.error(customerBorrowalsResponse.error);
            }

            const customerBorrowals = customerBorrowalsResponse.value;

            if (customerBorrowals.length !== 0) {

                // TODO Validate if the inputs are clear
                const borrowalLimit = customerBorrowals[0].customer.borrowalLimit;

                const borrowalDtos = customerBorrowals.map((borrowal) => new BorrowalDto(borrowal.book.id, borrowal.id))
                const customerBorrowalsDto = new CustomerBorrowalsDto(customerId, borrowalLimit, borrowalDtos);

                return Result.ok(customerBorrowalsDto);

            }

            // if no records, check if customer exists
            const customerResponse = await this._readableCustomerRepo.getById(customerId);

            if (customerResponse.isFailure()) {
                return Result.error(customerResponse.error)
            }

            const customer = customerResponse.value;

            // customer doent exist
            if (!customer) {
                return Result.error(new CustomerDoesntExistError(`Customer with id ${customerId} doesn't exist.`));
            }

            // TODO Validate if the inputs are clear
            const borrowalLimit = customer.borrowalLimit;
            const borrowalDtos: BorrowalDto[] = [];

            // return customer with empty active borrowals list
            const customerBorrowalsDto = new CustomerBorrowalsDto(customerId, borrowalLimit, borrowalDtos);

            return Result.ok(customerBorrowalsDto);

        } catch (error) {
            return Result.error(error);
        }
    }

    async saveCustomerBorrowals(updatedBorrowals: CustomerBorrowalsDto): Promise<Result<Error | bookAlreadyBorrowedError, void>> {
        try {
            // SAVE NEW BORROWALS

            // customer
            const customer = new Customer();
            if (!updatedBorrowals.customerId) return Result.error(new Error("Customer id is not present in the updated borrowal DTO."));
            customer.id = updatedBorrowals.customerId;

            // borrowed status
            const borrowedStatus = BorrowalStatus.Borrowed;
            
            // timestamp
            // TODO create a value object of this
            const timestamptz = new Date();

            const newCustomerBorrowals = updatedBorrowals.borrowals.map((borrowal) => {
                const customerBorrowal = new CustomerBorrowal();
                customerBorrowal.customer = customer;
                customerBorrowal.borrowalStatus = borrowedStatus;
                customerBorrowal.borrowalTimestamp = timestamptz;

                // book
                const book = new Book();
                book.id = borrowal.bookId;
                customerBorrowal.book = book;

                return customerBorrowal;
            })

            const saveResponse = await this._customerBorrowalRepo.saveNewCustomerBorrowals(newCustomerBorrowals);

            if (saveResponse.isFailure()) {
                return Result.error(saveResponse.error)
            }

            // update borrowal returns
            const customerBorrowalReturns= new CustomerBorrowalReturnDto(updatedBorrowals.returns, timestamptz);
            await this._customerBorrowalRepo.saveCustomerBorrowalReturns(customerBorrowalReturns);

            return Result.ok();

        } catch (error) {
            return Result.error(error);
        }
    }

}