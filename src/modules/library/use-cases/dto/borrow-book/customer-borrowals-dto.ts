import BorrowalDto from "./borrowal-dto";

export default class CustomerBorrowalsDto {
    private _customerId: number;
    private _borrowalLimit: number;
	private _borrowals: BorrowalDto[];
	private _returns: number[];

	constructor(customerId: number, borrowalLimit: number, borrowals: BorrowalDto[])
	constructor(customerId: number, borrowalLimit: number, borrowals: BorrowalDto[], borrowalReturns: number[])
	constructor(customerId: number, borrowalLimit: number, borrowals: BorrowalDto[], borrowalReturns?: number[]) {
		this._customerId = customerId;
		this._borrowalLimit = borrowalLimit;
		this._borrowals = borrowals;
		this._returns = borrowalReturns || [];
    }

	public get customerId(): number {
		return this._customerId;
	}

	public get borrowalLimit(): number {
		return this._borrowalLimit;
	}

	public get borrowals(): BorrowalDto[] {
		return this._borrowals;
	}

	public get returns(): number[] {
		return this._returns;
	}

}