import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { address, addressId } from './address'
import type { payment, paymentId } from './payment'
import type { rental, rentalId } from './rental'
import type { store, storeId } from './store'

export interface staffAttributes {
  staff_id: number
  first_name: string
  last_name: string
  address_id: number
  email?: string
  store_id: number
  active: boolean
  username: string
  password?: string
  last_update: Date
  picture?: string
}

export type staffPk = 'staff_id'
export type staffId = staff[staffPk]
export type staffOptionalAttributes =
  | 'staff_id'
  | 'email'
  | 'active'
  | 'password'
  | 'last_update'
  | 'picture'
export type staffCreationAttributes = Optional<
  staffAttributes,
  staffOptionalAttributes
>

export class staff
  extends Model<staffAttributes, staffCreationAttributes>
  implements staffAttributes
{
  staff_id!: number
  first_name!: string
  last_name!: string
  address_id!: number
  email?: string
  store_id!: number
  active!: boolean
  username!: string
  password?: string
  last_update!: Date
  picture?: string

  // staff belongsTo address via address_id
  address!: address
  getAddress!: Sequelize.BelongsToGetAssociationMixin<address>
  setAddress!: Sequelize.BelongsToSetAssociationMixin<address, addressId>
  createAddress!: Sequelize.BelongsToCreateAssociationMixin<address>
  // staff hasMany payment via staff_id
  payments!: payment[]
  getPayments!: Sequelize.HasManyGetAssociationsMixin<payment>
  setPayments!: Sequelize.HasManySetAssociationsMixin<payment, paymentId>
  addPayment!: Sequelize.HasManyAddAssociationMixin<payment, paymentId>
  addPayments!: Sequelize.HasManyAddAssociationsMixin<payment, paymentId>
  createPayment!: Sequelize.HasManyCreateAssociationMixin<payment>
  removePayment!: Sequelize.HasManyRemoveAssociationMixin<payment, paymentId>
  removePayments!: Sequelize.HasManyRemoveAssociationsMixin<payment, paymentId>
  hasPayment!: Sequelize.HasManyHasAssociationMixin<payment, paymentId>
  hasPayments!: Sequelize.HasManyHasAssociationsMixin<payment, paymentId>
  countPayments!: Sequelize.HasManyCountAssociationsMixin
  // staff hasMany rental via staff_id
  rentals!: rental[]
  getRentals!: Sequelize.HasManyGetAssociationsMixin<rental>
  setRentals!: Sequelize.HasManySetAssociationsMixin<rental, rentalId>
  addRental!: Sequelize.HasManyAddAssociationMixin<rental, rentalId>
  addRentals!: Sequelize.HasManyAddAssociationsMixin<rental, rentalId>
  createRental!: Sequelize.HasManyCreateAssociationMixin<rental>
  removeRental!: Sequelize.HasManyRemoveAssociationMixin<rental, rentalId>
  removeRentals!: Sequelize.HasManyRemoveAssociationsMixin<rental, rentalId>
  hasRental!: Sequelize.HasManyHasAssociationMixin<rental, rentalId>
  hasRentals!: Sequelize.HasManyHasAssociationsMixin<rental, rentalId>
  countRentals!: Sequelize.HasManyCountAssociationsMixin
  // staff hasMany store via manager_staff_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof staff {
    return staff.init(
      {
        staff_id: {
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
        address_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'address',
            key: 'address_id',
          },
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        store_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        username: {
          type: DataTypes.STRING(16),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(40),
          allowNull: true,
        },
        last_update: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now'),
        },
        picture: {
          type: DataTypes.BLOB,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'staff',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'staff_pkey',
            unique: true,
            fields: [{ name: 'staff_id' }],
          },
        ],
      },
    )
  }
}
