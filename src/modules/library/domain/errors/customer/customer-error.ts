import InternalError from "../internal-error";

export default class CustomerError extends InternalError {
    constructor(message: string, error?: any) {
        super(message);
        this.error = error;

        Object.setPrototypeOf(this, CustomerError.prototype);
    }
}