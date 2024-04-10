import { Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import 'dotenv/config'
import { INVERSE_TYPES } from 'config/types.ts'
import { AnimeModel } from 'models/Anime.ts'

// TODO move elastic search client to separate class
@injectable()
export class SearchController {
  // TODO move this out to service layer
  @inject(INVERSE_TYPES.IElasticClient) private service: IElasticClient
  #number : number = 0
  /**
   * Handles the search request.
   *
   * @param {Request} req The request
   * @param {Response} res The response
   * @returns {Promise<Response>} The response
   */
  async search (req: Request, res: Response): Promise<Response> {
    const response = await this.service.getClient().get<IAnime>({ id: '6616cfc4e2b0b38f0a24a374', index: 'anime' })
    console.log(response)
    return res.json({ message: 'search' })
  }

  async update (req: Request, res: Response): Promise<Response> {
    this.#number++
    await AnimeModel.updateOne({ animeId: 1 }, { title: `new ${this.#number}` })
    return res.json({ message: 'update' })
  }
}
