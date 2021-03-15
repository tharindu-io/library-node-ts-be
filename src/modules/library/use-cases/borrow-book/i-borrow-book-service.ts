import { Result } from "typescript-result";
import BookAlreadyBorrowedError from "../../domain/errors/book/book-already-borrowed-error";
import BookDoesntExistError from "../../domain/errors/book/book-doesnt-exist-error";
import CustomerDoesntExistError from "../../domain/errors/customer/customer-doesnt-exist-error";
import BookDto from "../dto/borrow-book/book-dto";
import CustomerBorrowalsDto from "../dto/borrow-book/customer-borrowals-dto";


export default interface IBorrowBookService {
    getBookById(bookId: number): Promise<Result<BookDoesntExistError | Error , BookDto>>;
    getCustomerBorrowalsById(customerId: number): Promise<Result<CustomerDoesntExistError | Error, CustomerBorrowalsDto>>;
    saveCustomerBorrowals(updated: CustomerBorrowalsDto): Promise<Result<BookAlreadyBorrowedError | Error, void>>;
}