import InvalidCustomerIdError from "../errors/book/invalid-customer-id-error";

export default class CustomerId {
    private _id: number;

    // constructor make sure book id class doesnt get created to undeifned states by handling all invariants.
    constructor(id: number) {
        if (!id) throw new InvalidCustomerIdError("Customer id can't be null or empty.");
		this._id = id;
    }

    public get id(): number {
        return this._id;
    }
}