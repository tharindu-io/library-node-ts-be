import DomainError from "../domain-error";

export default class InvalidCustomerIdError extends DomainError {
    error?: any;

    constructor(message: string, error?: any) {
        super(message);
        this.error = error;

        Object.setPrototypeOf(this, InvalidCustomerIdError.prototype);
    }
}