import CustomerIdError from "../errors/customer/customer-id-error";
import CustomerId from "./customer-id";

export default class Customer {
    private _customerId: CustomerId;
    private _borrowalLimit: number;

    constructor(id: number, borrowalLimit: number) {
        if (!id) throw new CustomerIdError("Customer Id can't be null or empty.");
        if (!borrowalLimit) throw new CustomerIdError("Borrowal limit can't be null.");
        this._customerId = new CustomerId(id);
        this._borrowalLimit = borrowalLimit;
    }

	public get customerId(): CustomerId {
		return this._customerId;
	}

	public get borrowalLimit(): number {
		return this._borrowalLimit;
	}
}