/**
 * An error that is thrown when a resource is not found, extends the Error class.
 */
export class NotFoundError extends Error {
  /**
   * Creates a new NotFoundError.
   *
   * @param {string} message - The message of the error. Defaults to 'The requested resource could not be found'.
   */
  constructor (message: string) {
    super(message || 'The requested resource could not be found')
    this.name = 'NotFoundError'
  }
}
