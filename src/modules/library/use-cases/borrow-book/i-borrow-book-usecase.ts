import { Result } from "typescript-result";
import BookAlreadyBorrowedError from "../../domain/errors/book/book-already-borrowed-error";
import BookDoesntExistError from "../../domain/errors/book/book-doesnt-exist-error";
import InvalidBookIdError from "../../domain/errors/book/invalid-book-id-error";
import BorrowalLimitError from "../../domain/errors/customer/borrowal-limit-error";
import CustomerDoesntExistError from "../../domain/errors/customer/customer-doesnt-exist-error";

export default interface IBorrowBookUseCase {
    borrowBookByCustomer(bookId: number, customerId: number): Promise<Result<InvalidBookIdError | BorrowalLimitError |
        BookAlreadyBorrowedError | CustomerDoesntExistError | BookDoesntExistError | Error, void>>;
}