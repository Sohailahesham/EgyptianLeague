class AppError extends Error {
    statusCode: number;
    statusText: string;

    constructor(message: string, statusCode: number, statusText: string) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;

        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;

        // Capture the stack trace for proper debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;