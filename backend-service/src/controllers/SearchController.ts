import { Request, Response } from 'express'
import { injectable } from 'inversify'
import { Client } from '@elastic/elasticsearch'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

@injectable()
export class SearchController {
  #client: Client
  constructor () {
    this.#client = new Client({
      node: 'https://localhost:9200',
      auth: {
        username: 'elastic',
        password: process.env.ELASTIC_PW
      },
      tls: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.resolve(__dirname, '../http_ca.crt'))
      }
    })
    this.#checkConnection()
  }

  /**
   * Handles the search request.
   *
   * @param {Request} req The request
   * @param {Response} res The response
   * @returns {Promise<Response>} The response
   */
  async search (req: Request, res: Response): Promise<Response> {
    // TODO move this to separate class eventually

  }

  async #checkConnection () {
    try {
      const response = await this.#client.cluster.health({})
      console.log('Cluster Health:', response)
      // Connection is successful if this point is reached
      // You can check the status in the response, e.g., "green", "yellow", or "red"
    } catch (error) {
      console.error('Connection failed:', error)
      // Handle connection failure
    }
  }
}
