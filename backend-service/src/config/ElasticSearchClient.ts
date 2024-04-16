// elasticsearchClient.ts
import { Client } from '@elastic/elasticsearch'
import fs from 'fs'
import { injectable } from 'inversify'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

@injectable()
export class ElasticSearchClient implements IElasticClient {
  client: Client
  constructor () {
    this.connectElastic()
    this.#checkConnection()
  }

  connectElastic () {
    if (!this.client) {
      this.client = new Client({
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
  }

  getClient () {
    if (!this.client) {
      throw new Error('Elasticsearch client has not been initialized. Please call connectElastic first.')
    }
    return this.client
  }

  indexDocument (document: ElasticIndex, id: string) {
    this.client.create({
      id,
      index: document.index,
      document: document.body
    }).catch((error) => { console.error('err', error.message) })
  }

  updateDocument (updatedFields: UnknowableObject, id: string, index: string) {
    this.client.update({
      id,
      index,
      doc: {
        ...updatedFields
      }

    }).then(res => console.log(res)).catch((error) => {
      console.error('Failed to update document:', error.message)
    })
  }

  deleteDocument (id: string, index: string) {
    this.client.delete({
      id,
      index
    }).then((res) => {
      console.log('Document deleted:', res)
    }).catch((error) => {
      console.error('Failed to delete document:', error.message)
    })
  }

  // TODO: handle error
  async #checkConnection () {
    try {
      const response = await this.client.cluster.health({})
      console.log('Cluster Health:', response)
      // Connection is successful if this point is reached
      // You can check the status in the response, e.g., "green", "yellow", or "red"
    } catch (error) {
      console.error('Connection failed:', error)
      // Handle connection failure
    }
  }
}
