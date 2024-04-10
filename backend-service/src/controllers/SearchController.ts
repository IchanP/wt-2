import { Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import 'dotenv/config'
import { Client } from '@elastic/elasticsearch'
import { INVERSE_TYPES } from 'config/types.ts'

// TODO move elastic search client to separate class
@injectable()
export class SearchController {
  @inject(INVERSE_TYPES.IElasticClient) private service: IElasticClient

  /**
   * Handles the search request.
   *
   * @param {Request} req The request
   * @param {Response} res The response
   * @returns {Promise<Response>} The response
   */
  async search (req: Request, res: Response): Promise<Response> {
    this.#checkConnection()
  }

  async #checkConnection () {
    try {
      const client: Client = this.service.getClient()
      const response = await client.cluster.health({})
      console.log('Cluster Health:', response)
      // Connection is successful if this point is reached
      // You can check the status in the response, e.g., "green", "yellow", or "red"
    } catch (error) {
      console.error('Connection failed:', error)
      // Handle connection failure
    }
  }
}
