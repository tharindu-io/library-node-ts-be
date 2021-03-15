export default class BookDto {
    private _id: number;
    private _isBorrowed: boolean;
    
    constructor(id: number, isBorrowed: boolean) {
        this._id = id;
        this._isBorrowed = isBorrowed;
    }

    get id() {
        return this._id;
    }

    get isBorrowed() {
        return this._isBorrowed;
    }
}