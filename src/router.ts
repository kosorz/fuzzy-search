import { Router, Application } from 'express'
import { getFilms } from '@/controllers/fuzzy-search'

const router = Router()

router.get('/fuzzy-search/:term', getFilms)

export default (app: Application) => app.use(router)
