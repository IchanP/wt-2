import { Client } from '@elastic/elasticsearch'
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types.js'

declare global {
    interface IElasticClient {
    connectElastic(): void;
    getClient(): Client;
    indexDocument (index: { index: string; body: object }, id: string): Promise<WriteResponseBase>
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

    interface DataSync {
        startSync(): void;
    }
}
