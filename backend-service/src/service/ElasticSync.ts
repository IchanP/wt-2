import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types.js'
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

@injectable()
export class ElasticSync implements DataSync {
  #elasticIndex = 'anime'
  constructor (@inject(INVERSE_TYPES.IElasticClient) private esClient: IElasticClient) {
    this.esClient.ensureIndexConfiguration(this.#elasticIndex, this.#buildAnimeIndexOptions())
  }

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

  async #indexAnimeDocument (document: IAnimeDocument) {
    const id = document._id.toString()
    this.esClient.indexDocument(this.#buildIndex(document), id)
  }

  async #updateAnimeDocument (document: IChange) {
    const id = document.documentKey._id.toString()
    const updatedFields = document.updateDescription.updatedFields
    delete updatedFields.updatedAt
    this.esClient.deleteDocument(id, this.#elasticIndex)
  }

  async #deleteAnimeDocument (documentKey: { _id: string }) {
    const id = documentKey._id.toString()
    this.esClient.deleteDocument(id, this.#elasticIndex)
  }

  #buildIndex (document: IAnimeDocument) {
    this.#sanitizeDocument(document)
    return {
      index: this.#elasticIndex,
      body: document
    }
  }

  #sanitizeDocument (document: IAnimeDocument) {
    delete document._id
    delete document.animeSeason._id
    delete document.createdAt
    delete document.updatedAt
    delete document.__v
    delete document.animeSeason.createdAt
    delete document.animeSeason.updatedAt
  }

  #buildAnimeIndexOptions () {
    return {
      index: 'anime',
      body: {
        settings: {
          max_ngram_diff: 18,
          analysis: {
            analyzer: {
              title_analyzer: {
                type: 'custom',
                tokenizer: 'my_custom_ngram_tokenizer',
                filter: ['lowercase']
              }
            },
            tokenizer: {
              my_custom_ngram_tokenizer: { // This is the correct placement and naming
                type: 'ngram',
                min_gram: 2,
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
            }
          }
        }
      }
    }
  }
}
