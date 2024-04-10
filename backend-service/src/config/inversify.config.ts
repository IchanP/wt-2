import 'reflect-metadata'
import { INVERSE_TYPES } from './types.ts'
import { SearchController } from 'controllers/SearchController.ts'
import { Container } from 'inversify'
import { ElasticSearchClient } from './elasticSearchClient.ts'

const container = new Container()

container.bind<SearchController>(INVERSE_TYPES.SearchController).to(SearchController)
container.bind<IElasticClient>(INVERSE_TYPES.IElasticClient).to(ElasticSearchClient)
export { container }
