
export class exception extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'error';
  }
}