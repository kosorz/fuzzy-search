import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import initRouter from '@/router'
import db from './db/database'
import process from 'node:process'
import { initModels } from '@/db/models/init-models'
import https from 'https'
import fs from 'fs'

const app = express()
const port = process.env.PORT || 3000

const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  ca: fs.readFileSync(process.env.SSL_CHAIN_PATH),
}

app.use(
  cors({
    origin: '*',
    methods: '*',
  }),
)

app.use(express.json())

initRouter(app)

// Start the HTTPS server
https.createServer(httpsOptions, app).listen(port, async () => {
  console.log(`Server running securely on port ${port}`)

  try {
    console.log('Initializing db connection...')
    await db.authenticate()
    console.log('Connection tp db has been established successfully...')
    initModels(db)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
