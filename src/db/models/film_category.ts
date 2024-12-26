import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { category, categoryId } from './category'
import type { film, filmId } from './film'

export interface film_categoryAttributes {
  film_id: number
  category_id: number
  last_update: Date
}

export type film_categoryPk = 'film_id' | 'category_id'
export type film_categoryId = film_category[film_categoryPk]
export type film_categoryOptionalAttributes = 'last_update'
export type film_categoryCreationAttributes = Optional<
  film_categoryAttributes,
  film_categoryOptionalAttributes
>

export class film_category
  extends Model<film_categoryAttributes, film_categoryCreationAttributes>
  implements film_categoryAttributes
{
  film_id!: number
  category_id!: number
  last_update!: Date

  // film_category belongsTo category via category_id
  category!: category
  getCategory!: Sequelize.BelongsToGetAssociationMixin<category>
  setCategory!: Sequelize.BelongsToSetAssociationMixin<category, categoryId>
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<category>
  // film_category belongsTo film via film_id
  film!: film
  getFilm!: Sequelize.BelongsToGetAssociationMixin<film>
  setFilm!: Sequelize.BelongsToSetAssociationMixin<film, filmId>
  createFilm!: Sequelize.BelongsToCreateAssociationMixin<film>

  static initModel(sequelize: Sequelize.Sequelize): typeof film_category {
    return film_category.init(
      {
        film_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'film',
            key: 'film_id',
          },
        },
        category_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'category',
            key: 'category_id',
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
        tableName: 'film_category',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'film_category_pkey',
            unique: true,
            fields: [{ name: 'film_id' }, { name: 'category_id' }],
          },
        ],
      },
    )
  }
}
