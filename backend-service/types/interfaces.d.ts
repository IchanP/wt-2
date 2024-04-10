import { Client } from '@elastic/elasticsearch'

declare global {
    interface IElasticClient {
    connectElastic(): Client;
    getClient(): Client;
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
}
