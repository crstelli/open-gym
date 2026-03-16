class AppError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super();

    this.code = code || 500;
    this.message = message || "Internal server error.";
  }
}

export { AppError };
