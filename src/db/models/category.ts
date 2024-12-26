import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { film, filmId } from './film'
import type { film_category, film_categoryId } from './film_category'

export interface categoryAttributes {
  category_id: number
  name: string
  last_update: Date
}

export type categoryPk = 'category_id'
export type categoryId = category[categoryPk]
export type categoryOptionalAttributes = 'category_id' | 'last_update'
export type categoryCreationAttributes = Optional<
  categoryAttributes,
  categoryOptionalAttributes
>

export class category
  extends Model<categoryAttributes, categoryCreationAttributes>
  implements categoryAttributes
{
  category_id!: number
  name!: string
  last_update!: Date

  // category belongsToMany film via category_id and film_id
  film_id_film_film_categories!: film[]
  getFilm_id_film_film_categories!: Sequelize.BelongsToManyGetAssociationsMixin<film>
  setFilm_id_film_film_categories!: Sequelize.BelongsToManySetAssociationsMixin<
    film,
    filmId
  >
  addFilm_id_film_film_category!: Sequelize.BelongsToManyAddAssociationMixin<
    film,
    filmId
  >
  addFilm_id_film_film_categories!: Sequelize.BelongsToManyAddAssociationsMixin<
    film,
    filmId
  >
  createFilm_id_film_film_category!: Sequelize.BelongsToManyCreateAssociationMixin<film>
  removeFilm_id_film_film_category!: Sequelize.BelongsToManyRemoveAssociationMixin<
    film,
    filmId
  >
  removeFilm_id_film_film_categories!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    film,
    filmId
  >
  hasFilm_id_film_film_category!: Sequelize.BelongsToManyHasAssociationMixin<
    film,
    filmId
  >
  hasFilm_id_film_film_categories!: Sequelize.BelongsToManyHasAssociationsMixin<
    film,
    filmId
  >
  countFilm_id_film_film_categories!: Sequelize.BelongsToManyCountAssociationsMixin
  // category hasMany film_category via category_id
  film_categories!: film_category[]
  getFilm_categories!: Sequelize.HasManyGetAssociationsMixin<film_category>
  setFilm_categories!: Sequelize.HasManySetAssociationsMixin<
    film_category,
    film_categoryId
  >
  addFilm_category!: Sequelize.HasManyAddAssociationMixin<
    film_category,
    film_categoryId
  >
  addFilm_categories!: Sequelize.HasManyAddAssociationsMixin<
    film_category,
    film_categoryId
  >
  createFilm_category!: Sequelize.HasManyCreateAssociationMixin<film_category>
  removeFilm_category!: Sequelize.HasManyRemoveAssociationMixin<
    film_category,
    film_categoryId
  >
  removeFilm_categories!: Sequelize.HasManyRemoveAssociationsMixin<
    film_category,
    film_categoryId
  >
  hasFilm_category!: Sequelize.HasManyHasAssociationMixin<
    film_category,
    film_categoryId
  >
  hasFilm_categories!: Sequelize.HasManyHasAssociationsMixin<
    film_category,
    film_categoryId
  >
  countFilm_categories!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof category {
    return category.init(
      {
        category_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(25),
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
        tableName: 'category',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'category_pkey',
            unique: true,
            fields: [{ name: 'category_id' }],
          },
        ],
      },
    )
  }
}
