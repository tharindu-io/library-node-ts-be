import { Result } from "typescript-result";
import BookError from '../errors/book/book-error';
import BookDoesntExistError from "../errors/book/book-doesnt-exist-error";
import IBookService from "../services/i-book-service";
import BookId from './book-id';

export default class Book {
    private _bookId: BookId;
    private _bookService: IBookService;

    constructor(id: string, bookService: IBookService) {
        this._bookId = new BookId(id);
        if (!bookService) throw new BookError("Book Service is not defined.");
        this._bookService = bookService;
    }

    public isBorrowed(): Result<BookDoesntExistError | Error, boolean> {
        return this._bookService.isBorrowed(this._bookId.id);
    }

    public getId(): string {
        return this._bookId.id;
    }
}