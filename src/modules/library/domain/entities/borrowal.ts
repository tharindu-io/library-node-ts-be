export default class Borrowal {
    private _id: number | undefined;
    private _bookId: number;

    constructor(bookId: number)
    constructor(bookId: number, id?: number)
    constructor(bookId: number, id?: number) {
        this._bookId = bookId;
        this._id = id;
    }

	public get bookId(): number {
		return this._bookId;
    }
    
}