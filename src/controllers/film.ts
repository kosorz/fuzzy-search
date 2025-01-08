import { Response, Request } from 'express'
import { z } from 'zod'
import { resolveFilm, resolveFilmSearch } from '@/repositories/film'

export const getFilmsSearch = async ({ params, body }: Request, res: Response) => {
  const getFilmsSchema = z.object({
    term: z.string().min(1),
    limit: z.optional(z.number()),
  })

  const parsePayload = () => {
    try {
      return getFilmsSchema.parse({ ...params, ...body })
    } catch (err) {
      res.status(400).json(err.errors)
    }
  }

  try {
    const films = await resolveFilmSearch(parsePayload())

    res.status(200).json(films)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.errors)
  }
}

export const getFilm = async ({ params }: Request, res: Response) => {
  const getFilmsSchema = z.object({
    id: z.preprocess((val) => {
      return Number(val)
    }, z.number().int()),
  })

  const parsePayload = () => {
    try {
      return getFilmsSchema.parse(params)
    } catch (err) {
      res.status(400).json(err.errors)
    }
  }

  try {
    const film = await resolveFilm(parsePayload())

    res.status(200).json(film)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.errors)
  }
}
