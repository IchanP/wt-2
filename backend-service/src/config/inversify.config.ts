import 'reflect-metadata'
import { INVERSE_TYPES } from './types.ts'
import { SearchController } from 'controllers/SearchController.ts'
import { Container } from 'inversify'

const container = new Container()

container.bind<SearchController>(INVERSE_TYPES.SearchController).to(SearchController)

export { container }
