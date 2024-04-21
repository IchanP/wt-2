import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'
import { AnimeModel } from 'models/Anime.ts'

interface IAnimeDocument extends IAnime {
    _id: string,
    animeSeason: {
        season: string;
        year?: number;
        _id: string;
        createdAt: Date;
        updatedAt: Date
    }
    createdAt: Date,
    updatedAt: Date
    __v: number
}

interface IChange {
    documentKey: {
        _id: string
    },
    updateDescription: {
    updatedFields: UnknowableObject
    }
}

/**
 * Syncs data between the MongoDB and Elasticsearch databases.
 */
@injectable()
export class ElasticSync implements DataSync {
  #elasticIndex = 'anime'
  /**
   * Constructor for the ElasticSync class.
   * Calls the client to ensure the index is configured and exists before operations start.
   *
   * @param {IElasticClient} esClient - The client to interact with the Elasticsearch database.
   */
  constructor (@inject(INVERSE_TYPES.IElasticClient) private esClient: IElasticClient) {
    this.esClient.ensureIndexConfiguration(this.#elasticIndex, this.#buildAnimeIndexOptions())
  }

  /**
   * Starts the sync process between the MongoDB and Elasticsearch databases.
   * Listgens to insert, update, delete and drop operations on the AnimeModel.
   */
  startSync () {
    AnimeModel.watch().on('change', async (change) => {
      if (change.operationType === 'insert') {
        await this.#indexAnimeDocument(change.fullDocument)
      } else if (change.operationType === 'update') {
        await this.#updateAnimeDocument(change)
      } else if (change.operationType === 'delete') {
        await this.#deleteAnimeDocument(change.documentKey)
      } else if (change.operationType === 'drop') {
        // TODO implement
      }
    })
  }

  /**
   * Indexes a new anime document in the Elasticsearch database.
   * The document is sanitized before being indexed.
   *
   * @param {IAnimeDocument} document - The anime document to be indexed.
   */
  async #indexAnimeDocument (document: IAnimeDocument) {
    const id = document._id.toString()
    this.esClient.indexDocument(this.#buildIndex(document), id)
  }

  /**
   * Updates an anime document in the Elasticsearch database.
   * The document is sanitized before being updated.
   *
   * @param {IChange} document - The change object containing the document key and the updated fields.
   */
  async #updateAnimeDocument (document: IChange) {
    const id = document.documentKey._id.toString()
    const updatedFields = document.updateDescription.updatedFields
    delete updatedFields.updatedAt
    this.esClient.deleteDocument(id, this.#elasticIndex)
  }

  /**
   * Deletes an anime document from the Elasticsearch database.
   *
   * @param {{_id: string}} documentKey - Contains the id of the document to be deleted.
   * @param {string} documentKey._id - The id of the document to be deleted.
   */
  async #deleteAnimeDocument (documentKey: { _id: string }) {
    const id = documentKey._id.toString()
    this.esClient.deleteDocument(id, this.#elasticIndex)
  }

  /**
   * Builds an index object for the Elasticsearch client.
   * The document is sanitized before being indexed.
   * The index object contains the index name and the document to be indexed.
   *
   * @param {IAnimeDocument} document - The anime document to be indexed.
   * @returns {ElasticIndex} The index object containing the index name and the document to be indexed.
   */
  #buildIndex (document: IAnimeDocument) {
    this.#sanitizeDocument(document)
    return {
      index: this.#elasticIndex,
      body: document
    }
  }

  /**
   * Sanitizes the document before being indexed.
   * Removes the _id, createdAt, updatedAt, __v, animeSeason._id, animeSeason.createdAt and animeSeason.updatedAt fields.
   * The document is modified in place.
   *
   * @param {IAnimeDocument} document - The anime document to be sanitized.
   */
  #sanitizeDocument (document: IAnimeDocument) {
    delete document._id
    delete document.animeSeason._id
    delete document.createdAt
    delete document.updatedAt
    delete document.__v
    delete document.animeSeason.createdAt
    delete document.animeSeason.updatedAt
  }

  /**
   * Builds the options object for the anime index in Elasticsearch.
   * The index is configured with a custom analyzer for the title and synonyms fields.
   * Maps the title and synonyms fields to the text type with the custom analyzer for both fields.
   *
   * @returns {IndicesCreateRequest} - The options object for the anime index in Elasticsearch.
   */
  #buildAnimeIndexOptions () {
    return {
      index: this.#elasticIndex,
      body: {
        settings: {
          max_ngram_diff: 18,
          analysis: {
            analyzer: {
              title_analyzer: {
                type: 'custom',
                tokenizer: 'title_synoynms_tokenizer',
                filter: ['lowercase']
              }
            },
            tokenizer: {
              title_synoynms_tokenizer: {
                type: 'edge_ngram',
                min_gram: 3,
                max_gram: 20,
                token_chars: ['letter', 'digit']
              }
            }
          }
        },
        mappings: {
          properties: {
            title: {
              type: 'text',
              analyzer: 'title_analyzer'
            },
            synonyms: {
              type: 'text',
              analyzer: 'title_analyzer'
            }
          }
        }
      }
    }
  }
}
