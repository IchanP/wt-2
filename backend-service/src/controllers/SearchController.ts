import { Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import 'dotenv/config'
import { INVERSE_TYPES } from 'config/types.ts'
import { AnimeModel } from 'models/Anime.ts'

@injectable()
export class SearchController {
  @inject(INVERSE_TYPES.ISearchAnime) private service: ISearchAnime
  #number : number = 0
  /**
   * Handles the search request.
   *
   * @param {Request} req The request
   * @param {Response} res The response
   * @returns {Promise<Response>} The response
   */
  async search (req: Request, res: Response): Promise<Response> {
    try {
      const keyword = req.body.keyword
      const searchFields: Array<string> = req.body.searchFields

      const found = await this.service.searchAnime(keyword, searchFields)

      // const found = await this.#findLowestAnimeSeasonYear()
      console.log(found.length)

      return res.json({ message: 'search' })
    } catch (e: unknown) {
      const err = e as Error
      console.error(err.message)
      // TODO error handling
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async update (req: Request, res: Response): Promise<Response> {
    this.#number++
    await AnimeModel.updateOne({ animeId: 1 }, { title: `new ${this.#number}` })
    return res.json({ message: 'update' })
  }
}
