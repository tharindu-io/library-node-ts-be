import InternalError from '../internal-error';

export default class BookError extends InternalError {
    constructor(message: string, error?: any) {
        super(message);
        this.error = error;

        Object.setPrototypeOf(this, BookError.prototype);
    }
}