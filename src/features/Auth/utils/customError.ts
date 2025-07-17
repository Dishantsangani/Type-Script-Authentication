export class EmailAlreadyExistsError extends Error {
  constructor(message = "Email already in Exist") {
    super(message);
    this.name = "Email Already Exists Error";
  }
}
