/**
 * Error thrown when no valid sources are found to fetch from.
 */
export class NoValidSourcesError extends Error {
  /**
   * Constructor for the NoValidSourcesError class.
   * @param {string} message - The message to display when the error is thrown.
   */
  constructor (message: string) {
    super(message || 'No valid sources found')
    this.name = 'NoValidSourcesError'
  }
}
