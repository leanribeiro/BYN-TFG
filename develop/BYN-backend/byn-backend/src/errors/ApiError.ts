export class ApiError extends Error {
  statusCode: number;
  code?: string;
  messages?: string[];

  constructor(statusCode: number, message: string, code?: string, messages?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.messages = messages;
  }
}
