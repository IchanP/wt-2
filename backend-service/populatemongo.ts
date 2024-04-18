import { AnimeModel } from './src/models/Anime.ts'
import fs from 'fs'
import { connectDB } from './src/config/mongoose.ts'
import 'dotenv/config'
import { container } from './src/config/inversify.config.ts'
import { INVERSE_TYPES } from './src/config/types.ts'
import { Client } from '@elastic/elasticsearch'
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types'

interface IElasticClient {
    connectElastic(): void;
    getClient(): Client;
    indexDocument (index: { index: string; body: object }, id: string): Promise<WriteResponseBase>
}
interface DataSync {
    startSync(): void;
}

const clientClass = container.get<IElasticClient>(INVERSE_TYPES.IElasticClient)
const client = clientClass.getClient()
const syncer = container.get<DataSync>(INVERSE_TYPES.DataSync)
syncer.startSync()

await connectDB(process.env.MONGO_CONNECTION_STRING as string)
await populate()
// await deleteIndex()

async function populate () {
  const file = fs.readFileSync('../anime-offline-database-minified.json', 'utf-8')
  const animes = await JSON.parse(file)

  let i = 1
  const length = animes.data.length
  for (const animeItem of animes.data) {
    const animeModel = new AnimeModel(animeItem)

    await animeModel.save()

    if (i % 100 === 0) {
      console.log(parseFloat((i / length * 100).toString()).toFixed(2) + '%')
    }
    i++
  }
}
async function deleteIndex (): Promise<void> {
  await client.indices.delete({ index: 'anime_new' }).catch(err => { console.error('err', err.message) })
}

client.count({ index: 'anime' }).then((res) => {
  console.log('Count:', res.count)
}).catch(err => {
  console.error('error', err.message)
})
