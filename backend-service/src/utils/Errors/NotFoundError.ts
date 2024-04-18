export class NotFoundError extends Error {
  constructor (message: string) {
    super(message || 'The requested resource could not be found')
    this.name = 'NotFoundError'
  }
}
