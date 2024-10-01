class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class EmailAlreadyExists extends BaseError {
  constructor() {
    super("Email is already taken");
  }
}

export class InvalidCredentials extends BaseError {
  constructor() {
    super("Invalid credentials");
  }
}

export class ConversationNotFound extends BaseError { 
  constructor() {
    super("Conversation not found");
  }
}