import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => {
  console.log('Hello from the backend!')
  return res.json({ message: 'Hello from the backend!' })
})
