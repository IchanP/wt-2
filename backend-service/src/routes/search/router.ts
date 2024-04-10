import express from 'express'
import { INVERSE_TYPES } from 'config/types.ts'
import { container } from 'config/inversify.config.ts'
import { SearchController } from 'controllers/SearchController.ts'

const controller: SearchController = container.get<SearchController>(INVERSE_TYPES.SearchController)
export const router = express.Router()

router.get('/search', (req, res) => {
  controller.search(req, res)
})

router.get('/update', (req, res) => {
  controller.update(req, res)
})
