import 'reflect-metadata'
import { INVERSE_TYPES } from './types.ts'
import { AnimeController } from 'controllers/AnimeController.ts'
import { Container } from 'inversify'
import { ElasticSearchClient } from './ElasticSearchClient.ts'
import { ElasticSync } from 'service/ElasticSync.ts'
import { AnimeSearchService } from 'service/AnimeSearchService.ts'
import { ElasticRepo } from 'repositories/ElasticRepo.ts'

const container = new Container()

container.bind<AnimeController>(INVERSE_TYPES.SearchController).to(AnimeController)
container.bind<IElasticClient>(INVERSE_TYPES.IElasticClient).to(ElasticSearchClient).inSingletonScope()
container.bind<DataSync>(INVERSE_TYPES.DataSync).to(ElasticSync).inSingletonScope()
container.bind<ISearchAnime>(INVERSE_TYPES.ISearchAnime).to(AnimeSearchService)
container.bind<ElasticIAnimeRepo>(INVERSE_TYPES.IElasticRepo).to(ElasticRepo)

export { container }
