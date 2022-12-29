class CustomError extends Error {
    invalidFields: string[];

    constructor(message: string, invalidFields: string[]) {
        super(message);

        this.name = this.constructor.name;

        // capturing the stack trace keeps the reference to error class
        Error.captureStackTrace(this, this.constructor);

        this.invalidFields = invalidFields;
    }
}

export default CustomError;