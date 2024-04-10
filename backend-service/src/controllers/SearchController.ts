import { Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import 'dotenv/config'
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
  }
}
