/**
 * Error class for when a fetch request fails.
 */
export class FailFetchError extends Error {
  /**
   * Constructor for the FailFetchError class.
   *
   * @param {string} message - The message to display when the error is thrown.
   */
  constructor (message: string) {
    super(message || 'Failed to fetch data')
    this.name = 'FailFetchError'
  }
}
