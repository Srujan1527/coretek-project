"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = `${statusCode}`.startsWith("4") ? "fail" : "Error";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
