import { Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import 'dotenv/config'
import { INVERSE_TYPES } from 'config/types.ts'
import { AnimeModel } from 'models/Anime.ts'
import { match } from 'assert'
import { SearchHit } from '@elastic/elasticsearch/lib/api/types.js'

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
    try {
      const found = await this.#searchAnime('Bungaku', ['title', 'synopsis'])
      console.log(found.length)
      return res.json({ message: 'search' })
    } catch (e: unknown) {
      const err = e as Error
      console.error(err.message)
    }
  }

  async #searchAnime (query: string, fields: Array<string>, searchParam?: Array<number>): Promise<IAnime[]> {
    const response = await this.service.getClient().search<IAnime>({
      index: 'anime',
      ...(searchParam ? { search_after: searchParam } : {}), // Only add search_after if it searchParam is not null
      sort: [{ _score: { order: 'asc' } }],
      query: {
        multi_match: {
          query: 'monogatari',
          fields: ['title', 'synopsis']
        }
      },
      size: 100
    })
    const lastHit = response.hits.hits[response.hits.hits.length - 1]
    console.log('total', response.hits.total)
    console.log(response.hits.hits.length)
    if (!lastHit) {
      return response.hits.hits.map(hit => hit._source)
    }
    const searchAfterParam = lastHit.sort
    const hits = response.hits.hits.map(hit => hit._source)
    hits.push(...await this.#searchAnime(query, fields, searchAfterParam))
    return hits
  }

  async update (req: Request, res: Response): Promise<Response> {
    this.#number++
    await AnimeModel.updateOne({ animeId: 1 }, { title: `new ${this.#number}` })
    return res.json({ message: 'update' })
  }
}
