import express from 'express'
import { INVERSE_TYPES } from 'config/types.ts'
import { container } from 'config/inversify.config.ts'
import { AnimeController } from 'controllers/AnimeController.ts'

const controller: AnimeController = container.get<AnimeController>(INVERSE_TYPES.SearchController)

export const router = express.Router()

router.get('/tag', (req, res, next) => {
  controller.fetchTagData(req, res, next)
})

router.get('/tags', (req, res, next) => {
  controller.fetchTags(req, res, next)
})

router.get('/count', (req, res, next) => {
  controller.fetchTotalByYear(req, res, next)
})

router.get('/search', (req, res, next) => {
  controller.searchAnimeTitle(req, res, next)
})

router.get('/:id', (req, res, next) => {
  controller.fetchAnimeById(req, res, next)
})