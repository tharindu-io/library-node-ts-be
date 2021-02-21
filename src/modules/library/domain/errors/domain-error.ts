import CommonError from "./common-error";

export default class DomainError extends CommonError {
    error?: any;

    constructor(message: string, error?: any) {
        super(message);
        this.error = error;

        Object.setPrototypeOf(this, DomainError.prototype);
    }
}