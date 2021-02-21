import { Result } from "typescript-result";
import BookDoesntExistError from "../errors/book/book-doesnt-exist-error";
import BookNotBorrowedError from "../errors/book/book-not-borrowed-error";
import CustomerDoesntExistError from "../errors/customer/customer-doesnt-exist-error";

export default interface ICustomerBorrowalService {
    isBorrowedByCustomer(bookId: string, customerId: string): Result<CustomerDoesntExistError |Error, number>;
    getCustomerBorrowalCount(customerId: string): Result<CustomerDoesntExistError | Error, number>;
    borrowBookByCustomer(bookId: string, customerId: string): Result<BookDoesntExistError | CustomerDoesntExistError | Error, void>;
    returnBook(bookId: string): Result<BookDoesntExistError | BookNotBorrowedError | Error, void>;
}