import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { address, addressId } from './address'
import type { payment, paymentId } from './payment'
import type { rental, rentalId } from './rental'

export interface customerAttributes {
  customer_id: number
  store_id: number
  first_name: string
  last_name: string
  email?: string
  address_id: number
  activebool: boolean
  create_date: string
  last_update?: Date
  active?: number
}

export type customerPk = 'customer_id'
export type customerId = customer[customerPk]
export type customerOptionalAttributes =
  | 'customer_id'
  | 'email'
  | 'activebool'
  | 'create_date'
  | 'last_update'
  | 'active'
export type customerCreationAttributes = Optional<
  customerAttributes,
  customerOptionalAttributes
>

export class customer
  extends Model<customerAttributes, customerCreationAttributes>
  implements customerAttributes
{
  customer_id!: number
  store_id!: number
  first_name!: string
  last_name!: string
  email?: string
  address_id!: number
  activebool!: boolean
  create_date!: string
  last_update?: Date
  active?: number

  // customer belongsTo address via address_id
  address!: address
  getAddress!: Sequelize.BelongsToGetAssociationMixin<address>
  setAddress!: Sequelize.BelongsToSetAssociationMixin<address, addressId>
  createAddress!: Sequelize.BelongsToCreateAssociationMixin<address>
  // customer hasMany payment via customer_id
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
  // customer hasMany rental via customer_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof customer {
    return customer.init(
      {
        customer_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        store_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        address_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'address',
            key: 'address_id',
          },
        },
        activebool: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        create_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: '(now',
        },
        last_update: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.fn('now'),
        },
        active: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'customer',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'customer_pkey',
            unique: true,
            fields: [{ name: 'customer_id' }],
          },
          {
            name: 'idx_fk_address_id',
            fields: [{ name: 'address_id' }],
          },
          {
            name: 'idx_fk_store_id',
            fields: [{ name: 'store_id' }],
          },
          {
            name: 'idx_last_name',
            fields: [{ name: 'last_name' }],
          },
        ],
      },
    )
  }
}
