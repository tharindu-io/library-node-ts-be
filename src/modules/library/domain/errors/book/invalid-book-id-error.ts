import DomainError from "../domain-error";

export default class InvalidBookIdError extends DomainError {
    error?: any;

    constructor(message: string, error?: any) {
        super(message);
        this.error = error;

        Object.setPrototypeOf(this, InvalidBookIdError.prototype);
    }
}