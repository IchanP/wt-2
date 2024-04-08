import express from 'express'
import { router as searchRouter } from './search/router'

export const router = express.Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Hello from the backend!' })
})

router.use('/search', searchRouter)
