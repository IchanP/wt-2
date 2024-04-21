import { Client } from '@elastic/elasticsearch'
import { AggregationsAggregate, AggregationsCardinalityAggregate, IndicesCreateRequest, SearchResponse } from '@elastic/elasticsearch/lib/api/types.js'

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
    ensureIndexConfiguration(index: string, indexOptions: IndicesCreateRequest): Promise<void>;
    connectElastic(): void;
    getClient(): Client;
    indexDocument (index: ElasticIndex, id: string): void;
    updateDocument (fieldsToUpdate: UnknowableObject, id: string, index: string): void;
    deleteDocument (id: string, index: string): void;
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
        sources: string[];
        episodes?: number;
        status: string;
        animeSeason: {
            season: string;
            year?: number;
        };
        picture: string;
        thumbnail: string;
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
        nameAllTags(): Promise<string[]>
        countTagByYear(tag: string, yearRange: YearRange): Promise<TagData>
        countAnime(yearRange: YearRange): Promise<TagData>
        getAnimeById(id: number): Promise<IAnime>
        searchGenreByYear(tag: string, yearRange: YearRange): Promise<IAnime[]>
    }
    interface DataSync {
        startSync(): void;
    }
    interface ElasticIAnimeRepo {
        searchMultiMatch(nextPageStartPoint: Array<number>, size: number, fields: Array<string>, query: string): Promise<SearchResponse<IAnime, Record<string, AggregationsAggregate>>>
        getAnimeTags(): Promise<BucketData[]>
        getTagDataByYear(tag: string, yearRange: YearRange): Promise<BucketData[]>
        getTotalAnimeByYear(yearRange: YearRange): Promise<BucketData[]>
        getOneByAnimeId(id: number): Promise<IAnime>
        searchAnimeByYear (nextPageStartPoint: Array<number>, size: number, yearRange: YearRange): Promise<SearchResponse<IAnime, Record<string, AggregationsAggregate>>>
        searchGenreByYear (nextPageStartPoint: Array<number>, size: number, year: YearRange, genre: string): Promise<SearchResponse<IAnime, Record<string, AggregationsAggregate>>>
    }
}
