export default class CommonError extends Error {
    error?: any;

    constructor(message: string, error?: any) {
        super(message);
        this.error = error;

        Object.setPrototypeOf(this, CommonError.prototype);
    }
}