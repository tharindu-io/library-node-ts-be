import { Result } from "typescript-result";
import Book from "../../domain/entities/book";
import Borrowal from "../../domain/entities/borrowal";
import Customer from "../../domain/entities/customer";
import CustomerBorrowals from "../../domain/entities/customer-borrowals";
import BookAlreadyBorrowedError from "../../domain/errors/book/book-already-borrowed-error";
import BookDoesntExistError from "../../domain/errors/book/book-doesnt-exist-error";
import InvalidBookIdError from "../../domain/errors/book/invalid-book-id-error";
import BorrowalLimitError from "../../domain/errors/customer/borrowal-limit-error";
import CustomerDoesntExistError from "../../domain/errors/customer/customer-doesnt-exist-error";
import BorrowalDto from "../dto/borrow-book/borrowal-dto";
import CustomerBorrowalsDto from "../dto/borrow-book/customer-borrowals-dto";
import IBorrowBookService from "./i-borrow-book-service";
import IBorrowBookUseCase from "./i-borrow-book-usecase";

export default class BorrowBookUseCase implements IBorrowBookUseCase {

    private _borrowBookService: IBorrowBookService;

    constructor(borrowBookService: IBorrowBookService) {
        this._borrowBookService = borrowBookService;
    }

    async borrowBookByCustomer(bookId: number, customerId: number): Promise<Result<InvalidBookIdError | BorrowalLimitError | BookAlreadyBorrowedError
        | CustomerDoesntExistError | BookDoesntExistError | Error, void>> {
        try {

            // get book dto by id
            const bookDtoResponse = await this._borrowBookService.getBookById(bookId);

            // return the error if the response was a failure
            if (bookDtoResponse.isFailure()) {
                return bookDtoResponse.forward();
            }

            // get the book dto
            const bookDto = bookDtoResponse.value;

            // create book domain object
            const book = new Book(bookDto.id, bookDto.isBorrowed);

            // get customer borrowal dto
            const customerBorrowalsDtoResponse = await this._borrowBookService.getCustomerBorrowalsById(customerId);

            // return the error if the response was a failure
            if (customerBorrowalsDtoResponse.isFailure()) {
                return customerBorrowalsDtoResponse.forward();
            }

            const customerBorrowalsDto = customerBorrowalsDtoResponse.value;

            const customer = new Customer(customerBorrowalsDto.customerId, customerBorrowalsDto.borrowalLimit);

            const borrowals = customerBorrowalsDto.borrowals.map((borrowal) => new Borrowal(borrowal.bookId, borrowal.id));

            const customerBorrowals = new CustomerBorrowals(customer, borrowals);

            customerBorrowals.borrow(book);

            const borrowalDtos = customerBorrowals.pendingBorrowals.map((borrowal) => new BorrowalDto(borrowal.bookId));

            const updatedCustomerBorrowalsDto = new CustomerBorrowalsDto(customer.customerId.id, customer.borrowalLimit, borrowalDtos);
            
            const saveResponse = await this._borrowBookService.saveCustomerBorrowals(updatedCustomerBorrowalsDto);

            if (saveResponse.isFailure()) {
                return Result.error(saveResponse.error);
            }

            return Result.ok();

        } catch (error) {
            return Result.error(error);
        }
    }
}