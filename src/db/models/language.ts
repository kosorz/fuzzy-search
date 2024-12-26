import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { film, filmId } from './film'

export interface languageAttributes {
  language_id: number
  name: string
  last_update: Date
}

export type languagePk = 'language_id'
export type languageId = language[languagePk]
export type languageOptionalAttributes = 'language_id' | 'last_update'
export type languageCreationAttributes = Optional<
  languageAttributes,
  languageOptionalAttributes
>

export class language
  extends Model<languageAttributes, languageCreationAttributes>
  implements languageAttributes
{
  language_id!: number
  name!: string
  last_update!: Date

  // language hasMany film via language_id
  films!: film[]
  getFilms!: Sequelize.HasManyGetAssociationsMixin<film>
  setFilms!: Sequelize.HasManySetAssociationsMixin<film, filmId>
  addFilm!: Sequelize.HasManyAddAssociationMixin<film, filmId>
  addFilms!: Sequelize.HasManyAddAssociationsMixin<film, filmId>
  createFilm!: Sequelize.HasManyCreateAssociationMixin<film>
  removeFilm!: Sequelize.HasManyRemoveAssociationMixin<film, filmId>
  removeFilms!: Sequelize.HasManyRemoveAssociationsMixin<film, filmId>
  hasFilm!: Sequelize.HasManyHasAssociationMixin<film, filmId>
  hasFilms!: Sequelize.HasManyHasAssociationsMixin<film, filmId>
  countFilms!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof language {
    return language.init(
      {
        language_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.CHAR(20),
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
        tableName: 'language',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'language_pkey',
            unique: true,
            fields: [{ name: 'language_id' }],
          },
        ],
      },
    )
  }
}
