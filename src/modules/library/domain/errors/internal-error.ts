import CommonError from "./common-error";

export default class InternalError extends CommonError {
    error?: any;

    constructor(message: string, error?: any) {
        super(message);
        this.error = error;

        Object.setPrototypeOf(this, InternalError.prototype);
    }
}