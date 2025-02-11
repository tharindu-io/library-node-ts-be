import InvalidBookIdError from '../errors/book/invalid-book-id-error';
export default class BookId {
    
    private _id: number;

    // constructor make sure book id class doesnt get created to undeifned states by handling all invariants.
    constructor(id: number) {
        if (!id) throw new InvalidBookIdError("Book id can't be null or undefined.");
		this._id = id;
    }

    public get id(): number {
        return this._id;
    }
}