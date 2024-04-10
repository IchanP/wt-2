import { INVERSE_TYPES } from 'config/types.ts'
import { inject, injectable } from 'inversify'
import { AnimeModel } from 'models/Anime.ts'

@injectable()
export class ElasticSync implements DataSync {
    @inject(INVERSE_TYPES.IElasticClient) private esClient: IElasticClient

    startSync () {
      AnimeModel.watch().on('change', async (change) => {
        if (change.operationType === 'insert') {
          await this.#indexAnimeDocument(change.fullDocument)
        } else if (change.operationType === 'update') {
        //  await this.esClient.updateDocument(change.fullDocument)
        } else if (change.operationType === 'delete') {
          //   await this.esClient.deleteDocument(change.documentKey)
        }
      })
    }

    async #indexAnimeDocument (document: IAnime) {
      const index = {
        index: 'anime',
        body: {
          document
        }
      }
      await this.esClient.indexDocument(index, document.animeId.toString())
    }
}
