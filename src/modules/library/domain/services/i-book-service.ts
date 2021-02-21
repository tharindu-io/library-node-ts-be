import { Result } from "typescript-result";
import BookDoesntExistError from '../errors/book/book-doesnt-exist-error';

export default interface IBookService {
    isBorrowed(bookId: string): Result<BookDoesntExistError | Error, boolean>;
}