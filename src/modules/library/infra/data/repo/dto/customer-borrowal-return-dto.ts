export default class CustomerBorrowalReturnDto {
    private _id: number[];
    private _returnTimestamp: Date;

	constructor(id: number[], returnTimestamp: Date) {
		this._id = id;
		this._returnTimestamp = returnTimestamp;
    }

	public get id(): number[] {
		return this._id;
	}

	public get returnTimestamp(): Date {
		return this._returnTimestamp;
	}

}