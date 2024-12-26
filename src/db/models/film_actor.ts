import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { actor, actorId } from './actor'
import type { film, filmId } from './film'

export interface film_actorAttributes {
  actor_id: number
  film_id: number
  last_update: Date
}

export type film_actorPk = 'actor_id' | 'film_id'
export type film_actorId = film_actor[film_actorPk]
export type film_actorOptionalAttributes = 'last_update'
export type film_actorCreationAttributes = Optional<
  film_actorAttributes,
  film_actorOptionalAttributes
>

export class film_actor
  extends Model<film_actorAttributes, film_actorCreationAttributes>
  implements film_actorAttributes
{
  actor_id!: number
  film_id!: number
  last_update!: Date

  // film_actor belongsTo actor via actor_id
  actor!: actor
  getActor!: Sequelize.BelongsToGetAssociationMixin<actor>
  setActor!: Sequelize.BelongsToSetAssociationMixin<actor, actorId>
  createActor!: Sequelize.BelongsToCreateAssociationMixin<actor>
  // film_actor belongsTo film via film_id
  film!: film
  getFilm!: Sequelize.BelongsToGetAssociationMixin<film>
  setFilm!: Sequelize.BelongsToSetAssociationMixin<film, filmId>
  createFilm!: Sequelize.BelongsToCreateAssociationMixin<film>

  static initModel(sequelize: Sequelize.Sequelize): typeof film_actor {
    return film_actor.init(
      {
        actor_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'actor',
            key: 'actor_id',
          },
        },
        film_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'film',
            key: 'film_id',
          },
        },
        last_update: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now'),
        },
      },
      {
        sequelize,
        tableName: 'film_actor',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'film_actor_pkey',
            unique: true,
            fields: [{ name: 'actor_id' }, { name: 'film_id' }],
          },
          {
            name: 'idx_fk_film_id',
            fields: [{ name: 'film_id' }],
          },
        ],
      },
    )
  }
}
