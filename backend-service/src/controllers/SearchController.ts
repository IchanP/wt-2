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
      // TODO check if undefined and if so throw error
      const keyword = req.query.keyword as string
      const searchFields: Array<string> = req.query.parsearchFields as Array<string>
      console.log(req.query)
      // const found = await this.service.searchAnime(keyword, searchFields)
      // const found = await this.#findLowestAnimeSeasonYear()
      const data = await this.service.findGenreTotals()
      // console.log(found.length)

      return res.json({ message: 'search', data })
    } catch (e: unknown) {
      const err = e as Error
      console.error(err.message)
      // TODO error handling
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async fetchTags (req: Request, res: Response) {
    try {
      const tags = await this.service.getAllTags()
      return res.json({ data: tags })
    } catch (e: unknown) {
      const err = e as Error
      console.error(err.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async fetchTagData (req: Request, res: Response) {
    // TODO error handling incase query is undefined
    try {
      const tag = req.query.tagname as string
      // TODO throw error if not number
      // Parseint to ensure it's a number can throw error if not
      const earliest = parseInt(req.query.earliest as string)
      const latest = parseInt(req.query.latest as string)
      const data = await this.service.getTagData(tag, { earliest, latest })
      return res.json({ data })
    } catch (e: unknown) {
      const err = e as Error
      console.error(err.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async fetchTotalByYear (req: Request, res:Response) {
    // TODO error handling
    try {
      const earliest = parseInt(req.query.earliest as string)
      const latest = parseInt(req.query.latest as string)
      const data = await this.service.getTotalByYear({ earliest, latest })
      return res.json({ data })
    } catch (e: unknown) {
      const err = e as Error
      console.error(err.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async update (req: Request, res: Response): Promise<Response> {
    this.#number++
    await AnimeModel.updateOne({ animeId: 1 }, { title: `new ${this.#number}` })
    return res.json({ message: 'update' })
  }
}
