import { AggregationsAggregate, SearchResponse } from '@elastic/elasticsearch/lib/api/types.js'
import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'

/**
 * Fetches data from the elasticsearch database, within the scope of the "anime" index.
 */
@injectable()
export class ElasticRepo implements ElasticIAnimeRepo {
 @inject(INVERSE_TYPES.IElasticClient) private service: IElasticClient
 #index = 'anime'
 // TODO this JSDOC
 /**
  *
  * @param query
  * @param fields
  * @param nextPageStartPoint
  * @param size
  */
 async searchMultiMatch (query: string, fields: Array<string>, nextPageStartPoint: Array<number>, size: number): Promise<SearchResponse<IAnime, Record<string, AggregationsAggregate>>> {
   return await this.service.getClient().search<IAnime>({
     index: this.#index,
     ...(nextPageStartPoint?.length > 0 ? { search_after: nextPageStartPoint } : {}),
     sort: [
       { _score: { order: 'desc' } },
       { animeId: { order: 'asc' } }
     ],
     query: {
       multi_match: {
         query,
         fields,
         type: 'phrase_prefix',
         slop: 10,
         max_expansions: 100
       }
     },
     size
   })
 }

 /**
  * Fetches all unique tags associated with any anime document in the database.
  *
  * @returns {Promise<BucketData[]>} The tags associated with the anime documents.
  */
 async getAnimeTags (): Promise<BucketData[]> {
   const response: SearchResponse<unknown, Record<string, AggregateBuckets>> = await this.service.getClient().search({
     index: this.#index,
     body: {
       size: 0,
       aggs: {
         tags: {
           terms: {
             field: 'tags.keyword',
             size: 100
           }
         }
       }
     }
   })
   return response.aggregations.tags.buckets
 }

 /**
  * Fetches the number of occurences of the passed tag within the given year range.
  *
  * @param {string} tag - The name of the tag to be counted.
  * @param {YearRange} yearRange - The range of years to search within.
  * @returns {Promise<BucketData[]>} The number of occurences of the tag within the given year range. Key is the year, doc_count is the number of occurences in that year.
  */
 async getTagDataByYear (tag: string, yearRange: YearRange): Promise<BucketData[]> {
   const response: SearchResponse<unknown, Record<string, AggregateBuckets>> = await this.service.getClient().search({
     index: this.#index,
     body: {
       size: 0,
       query: {
         match: {
           tags: tag
         }
       }
     },
     aggs: {
       years: {
         terms: {
           field: 'animeSeason.year',
           size: 100
         }
       }
     },
     post_filter: {
       range: {
         'animeSeason.year': {
           gte: yearRange.earliest,
           lte: yearRange.latest
         }
       }
     }
   })
   return response.aggregations.years.buckets
 }

 /**
  * Fetches the number of anime produced within the given year range and returns the number for each year.
  *
  * @param {YearRange} yearRange - The range of years to search within.
  * @returns {Promise<BucketData[]>} The number of anime produced within the given year range. Key is the year, doc_count is the number of anime produced in that year.
  */
 async getTotalAnimeByYear (yearRange: YearRange): Promise<BucketData[]> {
   const response: SearchResponse<unknown, Record<string, AggregateBuckets>> = await this.service.getClient().search({
     index: this.#index,
     body: {
       size: 0
     },
     aggs: {
       years: {
         terms: {
           field: 'animeSeason.year',
           size: yearRange.latest - --yearRange.earliest
         }
       }
     }
   })
   return response.aggregations.years.buckets
 }

 /**
  * Fetches a single anime document by the animeId.
  *
  * @param {number} id - The animeId of the anime document to be fetched.
  * @returns {Promise<IAnime>} The anime document fetched.
  */
 async getOneByAnimeId (id: number): Promise<IAnime> {
   const response = await this.service.getClient().search<IAnime>({
     index: this.#index,
     query: {
       match: {
         animeId: id
       }
     }
   })
   return response?.hits?.hits[0]?._source
 }
}
