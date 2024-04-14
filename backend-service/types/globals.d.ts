import { Client } from '@elastic/elasticsearch'
import { AggregationsCardinalityAggregate } from '@elastic/elasticsearch/lib/api/types.js'

declare global {
    type ElasticIndex = {
        index: string;
        body: object;
    }
    type UnknowableObject = { [key: string]: string | number }
    type BucketData = { key: string, doc_count: number }
    type TagData = { tag: string, data: BucketData[] }
    type YearRange = { earliest: number, latest: number}
    interface IElasticClient {
    connectElastic(): void;
    getClient(): Client;
    indexDocument (index: ElasticIndex, id: string): void;
    updateDocument (fieldsToUpdate: UnknowableObject, id: string, index: string): void;
    }
    interface AggregateBuckets extends AggregationsCardinalityAggregate {
        buckets: BucketData[]
      }
    interface ExtendedError extends Error {
        status: number;
        code: number;
        cause: {
            status: number;
            message: string;
            stack: string;
        }
    }
    interface IAnime {
        animeId: number;
        title: string;
        type: string;
        episodes?: number;
        status: string;
        animeSeason: {
            season: string;
            year?: number;
        };
        synonyms: string[];
        relatedAnime: string[];
        tags: string[];
        broadcast?: {
            day: string;
            time: string;
            timezone: string;
            string: string;
        };
    }
    interface ISearchAnime {
        searchAnime(query: string, fields: Array<string>, searchParam?: Array<number>): Promise<IAnime[]>;
        findGenreTotals(): Promise<BucketData[]>
        getAllTags(): Promise<string[]>
        getTagData(tag: string, yearRange: YearRange): Promise<TagData>
    }
    interface DataSync {
        startSync(): void;
    }
    interface ElasticIAnimeRepo {
        getAnimeTags(): Promise<BucketData[]>
        getTagDataByYear(tag: string, afterYear: number): Promise<BucketData[]>
    }
}
