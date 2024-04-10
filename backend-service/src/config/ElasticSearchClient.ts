// elasticsearchClient.ts
import { Client } from '@elastic/elasticsearch'
import fs from 'fs'
import { injectable } from 'inversify'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let client: Client | null = null

@injectable()
export class ElasticSearchClient implements IElasticClient {
  constructor () {
    this.connectElastic()
  }

  connectElastic () {
    if (!client) {
      client = new Client({
        node: 'https://localhost:9200',
        auth: {
          username: 'elastic',
          password: process.env.ELASTIC_PW
        },
        tls: {
          rejectUnauthorized: false,
          ca: fs.readFileSync(path.resolve(__dirname, '../http_ca.crt'))
        }
      })
    }
    console.log(client)
    return client
  }

  getClient () {
    if (!client) {
      throw new Error('Elasticsearch client has not been initialized. Please call connectElastic first.')
    }
    return client
  }
}
