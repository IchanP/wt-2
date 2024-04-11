import 'reflect-metadata'
import { INVERSE_TYPES } from './types.ts'
import { SearchController } from 'controllers/SearchController.ts'
import { Container } from 'inversify'
import { ElasticSearchClient } from './ElasticSearchClient.ts'
import { ElasticSync } from 'service/ElasticSync.ts'
import { SearchService } from 'service/SearchService.ts'

const container = new Container()

container.bind<SearchController>(INVERSE_TYPES.SearchController).to(SearchController)
container.bind<IElasticClient>(INVERSE_TYPES.IElasticClient).to(ElasticSearchClient).inSingletonScope()
container.bind<DataSync>(INVERSE_TYPES.DataSync).to(ElasticSync).inSingletonScope()
container.bind<ISearchAnime>(INVERSE_TYPES.ISearchAnime).to(SearchService)
export { container }
