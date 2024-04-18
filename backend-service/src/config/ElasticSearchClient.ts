// elasticsearchClient.ts
import { Client } from '@elastic/elasticsearch'
import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types.js'
import fs from 'fs'
import { injectable } from 'inversify'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * A class that handles general elasticsearch operations such as creating, updating, and deleting documents.
 */
@injectable()
export class ElasticSearchClient implements IElasticClient {
  client: Client
  /**
   * Constructor that initializes the elasticsearch client.
   */
  constructor () {
    this.connectElastic()
    this.#checkConnection()
  }

  /**
   * Connects to the elasticsearch client.
   */
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

  /**
   * Ensures that the index configuration is set up correctly.
   * If the index does not exist, it will be created.
   *
   * @param {string} indexName - The name of the index to be created.
   * @param {IndicesCreateRequest} indexOptions - The options for the index creation.
   */
  async ensureIndexConfiguration (indexName: string, indexOptions: IndicesCreateRequest): Promise<void> {
    try {
      const exists = await this.client.indices.exists({ index: indexName })
      if (!exists) {
        await this.client.indices.create(indexOptions)

        console.log(`Index ${indexName} created`)
      } else {
        console.log(`Index ${indexName} already exists`)
      }
    } catch (e: unknown) {
      console.error('Failed to create index:', (e as Error).message)
      process.exit(1) // Exit the program if index creation fails
    }
  }

  /**
   * Returns the elasticsearch client.
   *
   * @returns {Client} The elasticsearch client.
   */
  getClient () {
    if (!this.client) {
      throw new Error('Elasticsearch client has not been initialized. Please call connectElastic first.')
    }
    return this.client
  }

  /**
   * Indexes a document in elasticsearch.
   *
   * @param {ElasticIndex} document - The document to be indexed.
   * @param {string} id - The unique identifier of the document.
   */
  indexDocument (document: ElasticIndex, id: string) {
    this.client.create({
      id,
      index: document.index,
      document: document.body
    }).catch((error) => { console.error('err', error.message) })
  }

  /**
   * Updates a document in the provided index.
   *
   * @param {UnknowableObject} updatedFields - The fields on the document to be updated.
   * @param {string} id - The id of the document, used for identifying the document.
   * @param {string} index - The index where the document is located.
   */
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

  /**
   * Deletes a document from the provided index.
   *
   * @param {string} id - The id of the document to be deleted, used for identifying the document.
   * @param {string} index - The index where the document is located.
   */
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
  /**
   * Checks that the connection to the elasticsearch client was successful.
   */
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
