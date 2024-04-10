import express from 'express'
import { INVERSE_TYPES } from 'config/types'
import { container } from 'config/inversify.config'
import { SearchController } from 'controllers/SearchController'

const controller: SearchController = container.get<SearchController>(INVERSE_TYPES.SearchController)
export const router = express.Router()

router.get('/', (req, res) => {
  controller.search(req, res)
})

router.get('/update', (req, res) => {
  controller.update(req, res)
})
