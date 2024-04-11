import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'

@injectable()
export class SearchService implements ISearchAnime {
  @inject(INVERSE_TYPES.IElasticClient) private service: IElasticClient

  public async searchAnime (query: string, fields: Array<string>, searchParam?: Array<number>): Promise<IAnime[]> {
    const pageSize = 10000
    let allHits: IAnime[] = []
    let nextPageStartPoint = searchParam
    let moreResultsAvailable = true

    while (moreResultsAvailable) {
      const response = await this.#executeSearchQuery(query, fields, nextPageStartPoint, pageSize)
      const results = response.hits.hits.map(hit => hit._source)
      allHits = allHits.concat(results)

      if (results.length < pageSize) {
        moreResultsAvailable = false
      } else {
        nextPageStartPoint = response.hits.hits[results.length - 1].sort
      }
    }

    return allHits
  }

  async #executeSearchQuery (query: string, fields: Array<string>, nextPageStartPoint: Array<number>, size: number) {
    return await this.service.getClient().search<IAnime>({
      index: 'anime',
      ...(nextPageStartPoint?.length > 0 ? { search_after: nextPageStartPoint } : {}),
      sort: [
        { _score: { order: 'desc' } },
        { animeId: { order: 'asc' } }
      ],
      query: {
        multi_match: {
          query,
          fields
        }
      },
      size
    })
  }

  async #findLowestAnimeSeasonYear () {
    try {
      // Aggregation query to find the lowest anime season year
      const response = await this.service.getClient().search({
        index: 'anime',
        size: 0, // We don't need to get any documents back
        body: {
          aggs: {
            min_year: {
              min: {
                field: 'animeSeason.year' // Adjusted for nested field access
              }
            }
          }
        }
      })

      console.log('The lowest anime season year is:', response)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
}
