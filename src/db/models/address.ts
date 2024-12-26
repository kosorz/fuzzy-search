import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { city, cityId } from './city'
import type { customer, customerId } from './customer'
import type { staff, staffId } from './staff'
import type { store, storeId } from './store'

export interface addressAttributes {
  address_id: number
  address: string
  address2?: string
  district: string
  city_id: number
  postal_code?: string
  phone: string
  last_update: Date
}

export type addressPk = 'address_id'
export type addressId = address[addressPk]
export type addressOptionalAttributes =
  | 'address_id'
  | 'address2'
  | 'postal_code'
  | 'last_update'
export type addressCreationAttributes = Optional<
  addressAttributes,
  addressOptionalAttributes
>

export class address
  extends Model<addressAttributes, addressCreationAttributes>
  implements addressAttributes
{
  address_id!: number
  address!: string
  address2?: string
  district!: string
  city_id!: number
  postal_code?: string
  phone!: string
  last_update!: Date

  // address hasMany customer via address_id
  customers!: customer[]
  getCustomers!: Sequelize.HasManyGetAssociationsMixin<customer>
  setCustomers!: Sequelize.HasManySetAssociationsMixin<customer, customerId>
  addCustomer!: Sequelize.HasManyAddAssociationMixin<customer, customerId>
  addCustomers!: Sequelize.HasManyAddAssociationsMixin<customer, customerId>
  createCustomer!: Sequelize.HasManyCreateAssociationMixin<customer>
  removeCustomer!: Sequelize.HasManyRemoveAssociationMixin<customer, customerId>
  removeCustomers!: Sequelize.HasManyRemoveAssociationsMixin<
    customer,
    customerId
  >
  hasCustomer!: Sequelize.HasManyHasAssociationMixin<customer, customerId>
  hasCustomers!: Sequelize.HasManyHasAssociationsMixin<customer, customerId>
  countCustomers!: Sequelize.HasManyCountAssociationsMixin
  // address hasMany staff via address_id
  staffs!: staff[]
  getStaffs!: Sequelize.HasManyGetAssociationsMixin<staff>
  setStaffs!: Sequelize.HasManySetAssociationsMixin<staff, staffId>
  addStaff!: Sequelize.HasManyAddAssociationMixin<staff, staffId>
  addStaffs!: Sequelize.HasManyAddAssociationsMixin<staff, staffId>
  createStaff!: Sequelize.HasManyCreateAssociationMixin<staff>
  removeStaff!: Sequelize.HasManyRemoveAssociationMixin<staff, staffId>
  removeStaffs!: Sequelize.HasManyRemoveAssociationsMixin<staff, staffId>
  hasStaff!: Sequelize.HasManyHasAssociationMixin<staff, staffId>
  hasStaffs!: Sequelize.HasManyHasAssociationsMixin<staff, staffId>
  countStaffs!: Sequelize.HasManyCountAssociationsMixin
  // address hasMany store via address_id
  stores!: store[]
  getStores!: Sequelize.HasManyGetAssociationsMixin<store>
  setStores!: Sequelize.HasManySetAssociationsMixin<store, storeId>
  addStore!: Sequelize.HasManyAddAssociationMixin<store, storeId>
  addStores!: Sequelize.HasManyAddAssociationsMixin<store, storeId>
  createStore!: Sequelize.HasManyCreateAssociationMixin<store>
  removeStore!: Sequelize.HasManyRemoveAssociationMixin<store, storeId>
  removeStores!: Sequelize.HasManyRemoveAssociationsMixin<store, storeId>
  hasStore!: Sequelize.HasManyHasAssociationMixin<store, storeId>
  hasStores!: Sequelize.HasManyHasAssociationsMixin<store, storeId>
  countStores!: Sequelize.HasManyCountAssociationsMixin
  // address belongsTo city via city_id
  city!: city
  getCity!: Sequelize.BelongsToGetAssociationMixin<city>
  setCity!: Sequelize.BelongsToSetAssociationMixin<city, cityId>
  createCity!: Sequelize.BelongsToCreateAssociationMixin<city>

  static initModel(sequelize: Sequelize.Sequelize): typeof address {
    return address.init(
      {
        address_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        address: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        address2: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        district: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        city_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'city',
            key: 'city_id',
          },
        },
        postal_code: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(20),
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
        tableName: 'address',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'address_pkey',
            unique: true,
            fields: [{ name: 'address_id' }],
          },
          {
            name: 'idx_fk_city_id',
            fields: [{ name: 'city_id' }],
          },
        ],
      },
    )
  }
}
