import db from '@/db/database'
import { film } from '@/db/models/init-models'

export const resolveFilmSearch = async ({
  threshold = 0.1,
  limit = null,
  term,
}: {
  threshold?: number
  limit?: number
  term?: string
}) => {
  await db.query(`SET pg_trgm.similarity_threshold = :threshold`, {
    replacements: { threshold }
  })

  const tables = limit ? 'title, film_id' : 'film_id, description, title, release_year'

  const query = await db.query(
    `
        SELECT ${tables}
        FROM film
        WHERE title % :term
        ORDER BY similarity(title, :term) DESC
        LIMIT :limit
    `,
    { replacements: { term, limit } },
  )

  return query[0]
}

export const resolveFilm = async ({ id }: { id?: number }) => {
  return await film.findByPk(id)
}
