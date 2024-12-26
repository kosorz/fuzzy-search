import { Response, Request } from 'express'
import { z } from 'zod'
import db from '@/db/database'

export const getFilms = async ({ params, body }: Request, res: Response) => {
  const getFilmsSchema = z.object({
    term: z.string().min(1),
    threshold: z.number().min(0.01).max(0.3),
  })

  const parsePayload = () => {
    try {
      return getFilmsSchema.parse({ ...params, ...body })
    } catch (err) {
      res.status(400).json(err.errors)
    }
  }

  try {
    const { term, threshold } = parsePayload()

    await db.query(`SET pg_trgm.similarity_threshold = :threshold`, {
      replacements: { threshold },
    })

    const query = await db.query(
      `
        SELECT title
        FROM film
        WHERE title % :term
        ORDER BY similarity(title, :term) DESC
            LIMIT 10;
    `,
      { replacements: { term } },
    )

    res.status(200).json({ films: query[0] })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.errors)
  }
}
