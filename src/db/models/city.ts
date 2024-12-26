import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { address, addressId } from './address'
import type { country, countryId } from './country'

export interface cityAttributes {
  city_id: number
  city: string
  country_id: number
  last_update: Date
}

export type cityPk = 'city_id'
export type cityId = city[cityPk]
export type cityOptionalAttributes = 'city_id' | 'last_update'
export type cityCreationAttributes = Optional<
  cityAttributes,
  cityOptionalAttributes
>

export class city
  extends Model<cityAttributes, cityCreationAttributes>
  implements cityAttributes
{
  city_id!: number
  city!: string
  country_id!: number
  last_update!: Date

  // city hasMany address via city_id
  addresses!: address[]
  getAddresses!: Sequelize.HasManyGetAssociationsMixin<address>
  setAddresses!: Sequelize.HasManySetAssociationsMixin<address, addressId>
  addAddress!: Sequelize.HasManyAddAssociationMixin<address, addressId>
  addAddresses!: Sequelize.HasManyAddAssociationsMixin<address, addressId>
  createAddress!: Sequelize.HasManyCreateAssociationMixin<address>
  removeAddress!: Sequelize.HasManyRemoveAssociationMixin<address, addressId>
  removeAddresses!: Sequelize.HasManyRemoveAssociationsMixin<address, addressId>
  hasAddress!: Sequelize.HasManyHasAssociationMixin<address, addressId>
  hasAddresses!: Sequelize.HasManyHasAssociationsMixin<address, addressId>
  countAddresses!: Sequelize.HasManyCountAssociationsMixin
  // city belongsTo country via country_id
  country!: country
  getCountry!: Sequelize.BelongsToGetAssociationMixin<country>
  setCountry!: Sequelize.BelongsToSetAssociationMixin<country, countryId>
  createCountry!: Sequelize.BelongsToCreateAssociationMixin<country>

  static initModel(sequelize: Sequelize.Sequelize): typeof city {
    return city.init(
      {
        city_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        city: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        country_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'country',
            key: 'country_id',
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
        tableName: 'city',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'city_pkey',
            unique: true,
            fields: [{ name: 'city_id' }],
          },
          {
            name: 'idx_fk_country_id',
            fields: [{ name: 'country_id' }],
          },
        ],
      },
    )
  }
}
