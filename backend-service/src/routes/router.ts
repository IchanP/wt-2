import express from 'express'
import createError from 'http-errors'
import { router as apiRouter } from './api/router.ts'

export const router = express.Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Hello from the backend!' })
})

router.use('/api', apiRouter)

router.use('*', (req, res, next) => next(createError(404)))
