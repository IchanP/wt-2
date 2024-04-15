import { AggregationsCardinalityAggregate, SearchResponse } from '@elastic/elasticsearch/lib/api/types.js'
import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'

interface AggregateBuckets extends AggregationsCardinalityAggregate {
  buckets: BucketData[]
}

@injectable()
export class SearchService implements ISearchAnime {
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

  async getAllTags (): Promise<string[]> {
    const tags = await this.repo.getAnimeTags()
    return tags.map(tag => tag.key)
  }

  async getTagData (tag: string, yearRange: YearRange): Promise<TagData> {
    const tagData = await this.repo.getTagDataByYear(tag, yearRange)
    return { tag, data: tagData }
  }

  async getTotalByYear (yearRange: YearRange): Promise<TagData> {
    const total = await this.repo.getTotalAnimeByYear(yearRange)
    return { tag: 'Total', data: total }
  }

  async findGenreTotals () {
    try {
      const response: SearchResponse<unknown, Record<string, AggregateBuckets>> = await this.service.getClient().search({
        index: 'anime',
        size: 0,
        body: {
          aggs: {
            years: { // Aggregate by year
              terms: {
                field: 'animeSeason.year'
              },
              aggs: {
                genres: { // Within each year, aggregate by tag
                  terms: {
                    field: 'tags.keyword',
                    size: 10 // Top 10 tags per year
                  }
                }
              }
            }
          }
        }
      })
      // This has changed
      // TODO - tomorrow show this in a timeline chart
      // The idea is to grab the 5 most popular tags OVERALL
      // And then show them in a timeline starting from 1975 to currentYear
      console.log(response.aggregations.years.buckets[0].genres.buckets)
      const buckets = response.aggregations.genres.buckets
      console.log('The genre totals are:', buckets)
      return buckets
    } catch (error) {
      console.error('An error occurred:', error)
    }
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
