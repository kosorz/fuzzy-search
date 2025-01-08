import { Router, Application } from 'express'
import { getFilm, getFilmsSearch } from '@/controllers/film'

const router = Router()

router.post('/film-search/:term', getFilmsSearch)
router.get('/film/:id', getFilm)

export default (app: Application) => app.use(router)
