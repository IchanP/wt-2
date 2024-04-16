import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'
import { AnimeModel } from 'models/Anime.ts'

interface IAnimeDocument extends IAnime {
    _id: string,
    animeSeason: {
        season: string;
        year?: number;
        _id: string
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
    @inject(INVERSE_TYPES.IElasticClient) private esClient: IElasticClient
    #elasticIndex = 'anime'

    startSync () {
      AnimeModel.watch().on('change', async (change) => {
        if (change.operationType === 'insert') {
          await this.#indexAnimeDocument(change.fullDocument)
        } else if (change.operationType === 'update') {
          await this.#updateAnimeDocument(change)
        } else if (change.operationType === 'delete') {
          // TODO: Implement delete
          //   await this.esClient.deleteDocument(change.documentKey)
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
      this.esClient.updateDocument(updatedFields, id, this.#elasticIndex)
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
    }
}
