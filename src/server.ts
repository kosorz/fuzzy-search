import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import initRouter from '@/router'
import db from './db/database'
import process from 'node:process'
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

initRouter(app)

app.listen(port, async () => {
  console.log(`Server running on port ${port}`)

  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
