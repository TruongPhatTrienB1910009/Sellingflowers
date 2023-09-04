class ApiError extends Error {
    statusCode: any;
    message: string;
    constructor(statusCode: any, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ApiError;