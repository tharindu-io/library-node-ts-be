import BookError from '../errors/book/book-error';
import BookId from './book-id';

export default class Book {
    private _bookId: BookId;
    private _isBorrowed: boolean;

    constructor(id: number, isBorrowed: boolean) {
        this._bookId = new BookId(id);
        if(isBorrowed === null || isBorrowed === undefined) throw new BookError("Borrowed state can't be null.");
        this._isBorrowed = isBorrowed.valueOf();
    }

    public isBorrowed(): boolean {
        return this._isBorrowed;
    }

    public getId(): number {
        return this._bookId.id;
    }

    public markAsBorrowed(): void {
        this._isBorrowed = true;
    }
}