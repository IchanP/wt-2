/**
 * An error class that is thrown when an invalid URL query is provided for the endpoint.
 */
export class InvalidQueryError extends Error {
  /**
   * Creates a new InvalidQueryError.
   *
   * @param {string} message - The message of the error. Defaults to 'Invalid query provided.'
   */
  constructor (message: string) {
    super(message || 'Invalid query provided')
    this.name = 'InvalidQueryError'
  }
}
