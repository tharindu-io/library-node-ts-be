export default class BorrowalDto {
    private _bookId: number;
    private __id: number | undefined;

	constructor(bookId: number, _id?: number) {
		this._bookId = bookId;
		this.__id = _id;
    }
    
	public get bookId(): number {
		return this._bookId;
	}
    
	public get id(): number | undefined {
		return this.__id;
	}

}