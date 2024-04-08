import express from 'express'
import { INVERSE_TYPES } from 'config/types'
import { container } from 'config/inversify.config'
import { SearchController } from 'controllers/SearchController'

const controller = container.get<SearchController>(INVERSE_TYPES.SearchController)
export const router = express.Router()

router.get('/', (req, res) => {
  controller.search(req, res)
})
