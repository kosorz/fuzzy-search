import { Sequelize } from 'sequelize'
import * as process from 'node:process'
import fs from 'fs'
import path from 'path'

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  ...(process.env.DB_PATH_TO_CERTIFICATE && {
    dialectOptions: {
      ssl: {
        require: true,
        ca: [
          fs.readFileSync(
            path.resolve(__dirname, process.env.DB_PATH_TO_CERTIFICATE),
            'utf8',
          ),
        ],
      },
    },
  }),
})

export default db
