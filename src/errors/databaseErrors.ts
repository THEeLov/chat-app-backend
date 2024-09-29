class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class EmailAlreadyExists extends BaseError {
  constructor() {
    super("User already exists");
  }
}