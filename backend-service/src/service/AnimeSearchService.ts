import { AggregationsAggregate, SearchResponse } from '@elastic/elasticsearch/lib/api/types.js'
import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'
import { NotFoundError } from 'utils/Errors/NotFoundError.ts'

type SearchFunction = (arg1: string, arg2: Array<string> | YearRange, startPoint: Array<number>, pageSize: number) => Promise<SearchResponse<IAnime, Record<string, AggregationsAggregate>>>;

/**
 * Service layer for fetching anime related documents.
 * Handles logic for paginated results and mapping the repository responses to workable types.
 */
@injectable()
export class AnimeSearchService implements ISearchAnime {
  @inject(INVERSE_TYPES.IElasticRepo) private repo: ElasticIAnimeRepo

  /**
   * Searches for anime of the provided tag falling within the given year range.
   * Will request multiple pages of results if necessary.
   *
   * @param {string} tag - The tag to search for.
   * @param {YearRange} yearRange - The range of years to search for the tag in.
   * @returns {Promise<IAnime[]>} The anime documents that match the tag and year range.
   */
  async searchGenreByYear (tag: string, yearRange: YearRange): Promise<IAnime[]> {
    return this.#genericSearch(this.repo.searchGenreByYear.bind(this.repo), tag, yearRange)
  }

  /**
   * Searches for anime based on the query and fields provided.
   * Will requests multiple pages of results if necessary.
   *
   * @param {string} query - The elastic search query to pass to the elastic client.
   * @param {string[]} fields - The fields to search for the query in, may be multiple or simply one.
   * @returns {Promise<IAnime[]>} The anime documents that match the query.
   */
  async searchAnime (query: string, fields: Array<string>): Promise<IAnime[]> {
    return this.#genericSearch(this.repo.searchMultiMatch.bind(this.repo), query, fields)
  }

  /**
   * Fetches the name of all the tags in the database.
   *
   * @returns {Promise<string[]>} The names of all the tags in the database.
   */
  async nameAllTags (): Promise<string[]> {
    const tags = await this.repo.getAnimeTags()
    return tags.map(tag => tag.key)
  }

  /**
   * Fetches the count of the tag for each year falling within the yearRange.
   *
   * @param {string} tag - The name of the tag to count the occurrences of.
   * @param {YearRange} yearRange - The range of years to count the occurrences of the tag in.
   * @returns {Promise<TagData>} The name of the tag and the data associated with it in the form of a BucketData[] array where the key is the year and the doc_count is the count of the tag in that year.
   */
  async countTagByYear (tag: string, yearRange: YearRange): Promise<TagData> {
    const tagData = await this.repo.getTagDataByYear(tag, yearRange)
    return { tag, data: tagData }
  }

  /**
   * Fetches the total count of anime for each year falling within the yearRange.
   *
   * @param {YearRange} yearRange - The range of years to count the total anime documents within.
   * @returns {Promise<TagData>} The tag name, "total", and the data associated with it in the form of a BucketData[] array where the key is the year and the doc_count is the count of the anime documents in that year.
   */
  async countAnime (yearRange: YearRange): Promise<TagData> {
    const total = await this.repo.getTotalAnimeByYear(yearRange)
    return { tag: 'Total', data: total }
  }

  /**
   * Fetches an anime document by its animeId field.
   *
   * @throws {NotFoundError} If no anime document is found with the provided animeId.
   * @param {number} id - The animeId of the anime document to fetch, must correspond to the animeId field on the IAnime interface.
   * @returns {Promise<IAnime>} The anime document that corresponds to the animeId provided.
   */
  async getAnimeById (id: number): Promise<IAnime> {
    const anime = await this.repo.getOneByAnimeId(id)
    if (!anime) {
      throw new NotFoundError('Could not find an anime by that title')
    }
    return anime
  }

  /**
   * Generic function to handle the search logic that was being repeated.
   *
   * @param {SearchFunction} searchFn The specific search function to use.
   * @param {string} param1 The first parameter required by the search function.
   * @param {number | string[]} param2 The second parameter required by the search function.
   * @returns {Promise<IAnime[]>} The anime documents that match the conditions.
   */
  async #genericSearch (searchFn: SearchFunction, param1: string, param2: YearRange | string[]): Promise<IAnime[]> {
    const pageSize = 10000
    let allHits: IAnime[] = []
    let nextPageStartPoint: Array<number> = []
    let moreResultsAvailable = true

    while (moreResultsAvailable) {
      const response = await searchFn(param1, param2, nextPageStartPoint, pageSize)
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
}
