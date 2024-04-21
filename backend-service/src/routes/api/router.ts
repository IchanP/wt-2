import express from 'express'
import { router as animeRouter } from './anime/router.ts'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hello from the API endpoint!' }))

router.use('/anime', animeRouter)
