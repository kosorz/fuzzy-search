import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { city, cityId } from './city'

export interface countryAttributes {
  country_id: number
  country: string
  last_update: Date
}

export type countryPk = 'country_id'
export type countryId = country[countryPk]
export type countryOptionalAttributes = 'country_id' | 'last_update'
export type countryCreationAttributes = Optional<
  countryAttributes,
  countryOptionalAttributes
>

export class country
  extends Model<countryAttributes, countryCreationAttributes>
  implements countryAttributes
{
  country_id!: number
  country!: string
  last_update!: Date

  // country hasMany city via country_id
  cities!: city[]
  getCities!: Sequelize.HasManyGetAssociationsMixin<city>
  setCities!: Sequelize.HasManySetAssociationsMixin<city, cityId>
  addCity!: Sequelize.HasManyAddAssociationMixin<city, cityId>
  addCities!: Sequelize.HasManyAddAssociationsMixin<city, cityId>
  createCity!: Sequelize.HasManyCreateAssociationMixin<city>
  removeCity!: Sequelize.HasManyRemoveAssociationMixin<city, cityId>
  removeCities!: Sequelize.HasManyRemoveAssociationsMixin<city, cityId>
  hasCity!: Sequelize.HasManyHasAssociationMixin<city, cityId>
  hasCities!: Sequelize.HasManyHasAssociationsMixin<city, cityId>
  countCities!: Sequelize.HasManyCountAssociationsMixin

  static initModel(sequelize: Sequelize.Sequelize): typeof country {
    return country.init(
      {
        country_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        country: {
          type: DataTypes.STRING(50),
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
        tableName: 'country',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'country_pkey',
            unique: true,
            fields: [{ name: 'country_id' }],
          },
        ],
      },
    )
  }
}
