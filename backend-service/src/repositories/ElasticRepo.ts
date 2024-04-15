import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js'
import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'

@injectable()
export class ElasticRepo implements ElasticIAnimeRepo {
 @inject(INVERSE_TYPES.IElasticClient) private service: IElasticClient

 async getAnimeTags (): Promise<BucketData[]> {
   const response: SearchResponse<unknown, Record<string, AggregateBuckets>> = await this.service.getClient().search({
     index: 'anime',
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

 async getTagDataByYear (tag: string, yearRange: YearRange): Promise<BucketData[]> {
   const response: SearchResponse<unknown, Record<string, AggregateBuckets>> = await this.service.getClient().search({
     index: 'anime',
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

 async getTotalAnimeByYear (yearRange: YearRange): Promise<BucketData[]> {
   console.log(yearRange)
   const response: SearchResponse<unknown, Record<string, AggregateBuckets>> = await this.service.getClient().search({
     index: 'anime',
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
}
