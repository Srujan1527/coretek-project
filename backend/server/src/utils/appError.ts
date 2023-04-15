export class AppError extends Error {
  statusCode: any;
  constructor(message: any, statusCode: any) {
    super(message);
    this.statusCode = `${statusCode}`.startsWith("4") ? "fail" : "Error";

    Error.captureStackTrace(this, this.constructor);
  }
}
