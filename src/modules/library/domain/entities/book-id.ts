import BookError from '../errors/book/book-error';
import InvalidBookIdError from '../errors/book/invalid-book-id-error';
export default class BookId {
    
    private _id: string;

    // constructor make sure book id class doesnt get created to undeifned states by handling all invariants.
    constructor(id: string) {
        if (!id) throw new BookError("Book id can't be null or empty.");
        if (!id.match(/^[a-zA-Z0-9]{1,15}$/)) throw new InvalidBookIdError("Book id doesn't match id format.");
		this._id = id;
    }

    public get id(): string {
        return this._id;
    }
}