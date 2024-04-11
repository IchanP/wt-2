import { Client } from '@elastic/elasticsearch'

declare global {
    type ElasticIndex = {
        index: string;
        body: object;
    }
    type UnknowableObject = { [key: string]: string | number }

    interface IElasticClient {
    connectElastic(): void;
    getClient(): Client;
    indexDocument (index: ElasticIndex, id: string): void;
    updateDocument (fieldsToUpdate: UnknowableObject, id: string, index: string): void;
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
        searchAnime(query: string, fields: Array<string>, searchParam?: Array<number>): Promise<IAnime[]>
    }
    interface DataSync {
        startSync(): void;
    }
}
