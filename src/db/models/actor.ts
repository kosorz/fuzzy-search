import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { film, filmId } from './film'
import type { film_actor, film_actorId } from './film_actor'

export interface actorAttributes {
  actor_id: number
  first_name: string
  last_name: string
  last_update: Date
}

export type actorPk = 'actor_id'
export type actorId = actor[actorPk]
export type actorOptionalAttributes = 'actor_id' | 'last_update'
export type actorCreationAttributes = Optional<
  actorAttributes,
  actorOptionalAttributes
>

export class actor
  extends Model<actorAttributes, actorCreationAttributes>
  implements actorAttributes
{
  actor_id!: number
  first_name!: string
  last_name!: string
  last_update!: Date

  // actor belongsToMany film via actor_id and film_id
  film_id_films!: film[]
  getFilm_id_films!: Sequelize.BelongsToManyGetAssociationsMixin<film>
  setFilm_id_films!: Sequelize.BelongsToManySetAssociationsMixin<film, filmId>
  addFilm_id_film!: Sequelize.BelongsToManyAddAssociationMixin<film, filmId>
  addFilm_id_films!: Sequelize.BelongsToManyAddAssociationsMixin<film, filmId>
  createFilm_id_film!: Sequelize.BelongsToManyCreateAssociationMixin<film>
  removeFilm_id_film!: Sequelize.BelongsToManyRemoveAssociationMixin<
    film,
    filmId
  >
  removeFilm_id_films!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    film,
    filmId
  >
  hasFilm_id_film!: Sequelize.BelongsToManyHasAssociationMixin<film, filmId>
  hasFilm_id_films!: Sequelize.BelongsToManyHasAssociationsMixin<film, filmId>
  countFilm_id_films!: Sequelize.BelongsToManyCountAssociationsMixin
  // actor hasMany film_actor via actor_id
  film_actors!: film_actor[]
  getFilm_actors!: Sequelize.HasManyGetAssociationsMixin<film_actor>
  setFilm_actors!: Sequelize.HasManySetAssociationsMixin<
    film_actor,
    film_actorId
  >
  addFilm_actor!: Sequelize.HasManyAddAssociationMixin<film_actor, film_actorId>
  addFilm_actors!: Sequelize.HasManyAddAssociationsMixin<
    film_actor,
    film_actorId
  >
  createFilm_actor!: Sequelize.HasManyCreateAssociationMixin<film_actor>
  removeFilm_actor!: Sequelize.HasManyRemoveAssociationMixin<
    film_actor,
    film_actorId
  >
  removeFilm_actors!: Sequelize.HasManyRemoveAssociationsMixin<
    film_actor,
    film_actorId
  >
  hasFilm_actor!: Sequelize.HasManyHasAssociationMixin<film_actor, film_actorId>
  hasFilm_actors!: Sequelize.HasManyHasAssociationsMixin<
    film_actor,
    film_actorId
  >
  countFilm_actors!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof actor {
    return actor.init(
      {
        actor_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        first_name: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        last_update: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now'),
        },
      },
      {
        sequelize,
        tableName: 'actor',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'actor_pkey',
            unique: true,
            fields: [{ name: 'actor_id' }],
          },
          {
            name: 'idx_actor_last_name',
            fields: [{ name: 'last_name' }],
          },
        ],
      },
    )
  }
}
