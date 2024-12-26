import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { customer, customerId } from './customer'
import type { inventory, inventoryId } from './inventory'
import type { payment, paymentId } from './payment'
import type { staff, staffId } from './staff'

export interface rentalAttributes {
  rental_id: number
  rental_date: Date
  inventory_id: number
  customer_id: number
  return_date?: Date
  staff_id: number
  last_update: Date
}

export type rentalPk = 'rental_id'
export type rentalId = rental[rentalPk]
export type rentalOptionalAttributes =
  | 'rental_id'
  | 'return_date'
  | 'last_update'
export type rentalCreationAttributes = Optional<
  rentalAttributes,
  rentalOptionalAttributes
>

export class rental
  extends Model<rentalAttributes, rentalCreationAttributes>
  implements rentalAttributes
{
  rental_id!: number
  rental_date!: Date
  inventory_id!: number
  customer_id!: number
  return_date?: Date
  staff_id!: number
  last_update!: Date

  // rental belongsTo customer via customer_id
  customer!: customer
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<customer>
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<customer, customerId>
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<customer>
  // rental belongsTo inventory via inventory_id
  inventory!: inventory
  getInventory!: Sequelize.BelongsToGetAssociationMixin<inventory>
  setInventory!: Sequelize.BelongsToSetAssociationMixin<inventory, inventoryId>
  createInventory!: Sequelize.BelongsToCreateAssociationMixin<inventory>
  // rental hasMany payment via rental_id
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
  // rental belongsTo staff via staff_id
  staff!: staff
  getStaff!: Sequelize.BelongsToGetAssociationMixin<staff>
  setStaff!: Sequelize.BelongsToSetAssociationMixin<staff, staffId>
  createStaff!: Sequelize.BelongsToCreateAssociationMixin<staff>

  static initModel(sequelize: Sequelize.Sequelize): typeof rental {
    return rental.init(
      {
        rental_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        rental_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        inventory_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'inventory',
            key: 'inventory_id',
          },
        },
        customer_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'customer',
            key: 'customer_id',
          },
        },
        return_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        staff_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'staff',
            key: 'staff_id',
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
        tableName: 'rental',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'idx_fk_inventory_id',
            fields: [{ name: 'inventory_id' }],
          },
          {
            name: 'idx_unq_rental_rental_date_inventory_id_customer_id',
            unique: true,
            fields: [
              { name: 'rental_date' },
              { name: 'inventory_id' },
              { name: 'customer_id' },
            ],
          },
          {
            name: 'rental_pkey',
            unique: true,
            fields: [{ name: 'rental_id' }],
          },
        ],
      },
    )
  }
}
