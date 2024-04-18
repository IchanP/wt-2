import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'

/**
 *
 */
@injectable()
export class AnimeSearchService implements ISearchAnime {
  @inject(INVERSE_TYPES.IElasticRepo) private repo: ElasticIAnimeRepo

  /**
   *
   * @param query
   * @param fields
   * @param searchParam
   */
  public async searchAnime (query: string, fields: Array<string>, searchParam?: Array<number>): Promise<IAnime[]> {
    const pageSize = 10000
    let allHits: IAnime[] = []
    let nextPageStartPoint = searchParam
    let moreResultsAvailable = true
    while (moreResultsAvailable) {
      const response = await this.repo.searchMultiMatch(query, fields, nextPageStartPoint, pageSize)
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

  /**
   *
   */
  async nameAllTags (): Promise<string[]> {
    const tags = await this.repo.getAnimeTags()
    return tags.map(tag => tag.key)
  }

  /**
   *
   * @param tag
   * @param yearRange
   */
  async countTagByYear (tag: string, yearRange: YearRange): Promise<TagData> {
    const tagData = await this.repo.getTagDataByYear(tag, yearRange)
    return { tag, data: tagData }
  }

  /**
   *
   * @param yearRange
   */
  async countAnime (yearRange: YearRange): Promise<TagData> {
    const total = await this.repo.getTotalAnimeByYear(yearRange)
    return { tag: 'Total', data: total }
  }
}
