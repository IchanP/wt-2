import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'

@injectable()
export class AnimeSearchService implements ISearchAnime {
  // TODO refactor this and move fetching logic to repository
  // Drop the inject here
  @inject(INVERSE_TYPES.IElasticClient) private service: IElasticClient
  @inject(INVERSE_TYPES.IElasticRepo) private repo: ElasticIAnimeRepo
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

  async nameAllTags (): Promise<string[]> {
    const tags = await this.repo.getAnimeTags()
    return tags.map(tag => tag.key)
  }

  async countTagsByYear (tag: string, yearRange: YearRange): Promise<TagData> {
    const tagData = await this.repo.getTagDataByYear(tag, yearRange)
    return { tag, data: tagData }
  }

  async countAnime (yearRange: YearRange): Promise<TagData> {
    const total = await this.repo.getTotalAnimeByYear(yearRange)
    return { tag: 'Total', data: total }
  }
}
