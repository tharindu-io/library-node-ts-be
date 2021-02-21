import { Result } from "typescript-result";
import { BookAlreadyBorrowedError } from "../errors/book/book-already-borrowed-error";
import CustomerDoesntExistError from "../errors/customer/customer-doesnt-exist-error";
import CustomerError  from "../errors/customer/customer-error";
import { CustomerIdError } from "../errors/customer/customer-id-error";
import BorrowalLimitError from "../errors/customer/borrowal-limit-error";
import Book from "./book";
import BookDoesntExistError from '../errors/book/book-doesnt-exist-error';
import BookNotBorrowedError from "../errors/book/book-not-borrowed-error";
import ICustomerBorrowalService from "../services/i-customer-borrowal-service";

export default class Customer {

    // id can be a value object itself encapsulating the logic behind a valid customer id
    // havent modelled to that level for this exercise. see book id class for an example
    private _id: string;

    // the customer borrowal service interface abstracts away persistence and other logic
    // that is outside the domain layer
    private _customerBorrowalService: ICustomerBorrowalService;


    constructor(id: string, customerBorrowalService: ICustomerBorrowalService) {
        if (!id) throw new CustomerIdError("Customer Id is null or empty.");
        if (!customerBorrowalService) throw new CustomerError("Customer Borrowal Service is not defined.");
		this._id = id;
        this._customerBorrowalService = customerBorrowalService;
	}

    private canBorrow(): Result<CustomerDoesntExistError | Error, boolean> {

        const borrowCountOrError = this._customerBorrowalService.getCustomerBorrowalCount(this._id);

        if (borrowCountOrError.isSuccess()) {
            if (borrowCountOrError.value < 3) {
                return Result.ok(true);
            }
            return Result.ok(false);            
        }
        return Result.error(borrowCountOrError.error);
    }

    public borrow(book: Book): Result<BookDoesntExistError | BookAlreadyBorrowedError |
        CustomerDoesntExistError | BorrowalLimitError | Error, void> {

        // check if book is borrowed by another customer
        const isBorrowedResponse = book.isBorrowed();

        if (isBorrowedResponse.isFailure()) {
            return isBorrowedResponse.forward();
        }

        if (isBorrowedResponse.value) {
            return Result.error(
                new BookAlreadyBorrowedError(`Book with id ${book.getId()} is already borrowed.`)
            );
        }

        // check if customer can borrow more books
        const canBorrowResponse = this.canBorrow();

        if (canBorrowResponse.isFailure()) {
            return canBorrowResponse.forward();
        }

        if (!canBorrowResponse.value) {
            return Result.error(
                new BorrowalLimitError(`The customer with id ${this._id} has borrowed upto the allowed limit.`)
            );
        }

        // do persist or other actions outside of the domain layer
        const borrowBookResponse = this._customerBorrowalService.borrowBookByCustomer(book.getId(), this._id);

        // if (borrowBookResponse.isFailure()) {
        //     return borrowBookResponse.forward();
        // }

        return borrowBookResponse.forward();
    }

    public return(book: Book): Result<BookDoesntExistError | BookAlreadyBorrowedError
        | BookNotBorrowedError | Error, void> {

        // check if book is borrowed by customer
        const isBorrowedResponse = book.isBorrowed();

        if (isBorrowedResponse.isFailure()) {
            return isBorrowedResponse.forward();
        }

        if (isBorrowedResponse.value) {
            return Result.error(
                new BookAlreadyBorrowedError(`Book with id ${book.getId()} is already borrowed.`)
            );
        }

        // return book
        return this._customerBorrowalService.returnBook(book.getId()).forward();
    }
}