import express from 'express'
import { router as searchRouter } from './search/router.ts'

export const router = express.Router()

router.get('/search', searchRouter)

router.get('/tag', searchRouter)

router.get('/tags', searchRouter)

router.get('/', (req, res) => {
  return res.json({ message: 'Hello from the backend!' })
})
