import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { customer, customerId } from './customer'
import type { rental, rentalId } from './rental'
import type { staff, staffId } from './staff'

export interface paymentAttributes {
  payment_id: number
  customer_id: number
  staff_id: number
  rental_id: number
  amount: number
  payment_date: Date
}

export type paymentPk = 'payment_id'
export type paymentId = payment[paymentPk]
export type paymentOptionalAttributes = 'payment_id'
export type paymentCreationAttributes = Optional<
  paymentAttributes,
  paymentOptionalAttributes
>

export class payment
  extends Model<paymentAttributes, paymentCreationAttributes>
  implements paymentAttributes
{
  payment_id!: number
  customer_id!: number
  staff_id!: number
  rental_id!: number
  amount!: number
  payment_date!: Date

  // payment belongsTo customer via customer_id
  customer!: customer
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<customer>
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<customer, customerId>
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<customer>
  // payment belongsTo rental via rental_id
  rental!: rental
  getRental!: Sequelize.BelongsToGetAssociationMixin<rental>
  setRental!: Sequelize.BelongsToSetAssociationMixin<rental, rentalId>
  createRental!: Sequelize.BelongsToCreateAssociationMixin<rental>
  // payment belongsTo staff via staff_id
  staff!: staff
  getStaff!: Sequelize.BelongsToGetAssociationMixin<staff>
  setStaff!: Sequelize.BelongsToSetAssociationMixin<staff, staffId>
  createStaff!: Sequelize.BelongsToCreateAssociationMixin<staff>

  static initModel(sequelize: Sequelize.Sequelize): typeof payment {
    return payment.init(
      {
        payment_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        customer_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'customer',
            key: 'customer_id',
          },
        },
        staff_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'staff',
            key: 'staff_id',
          },
        },
        rental_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'rental',
            key: 'rental_id',
          },
        },
        amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        payment_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'payment',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'idx_fk_customer_id',
            fields: [{ name: 'customer_id' }],
          },
          {
            name: 'idx_fk_rental_id',
            fields: [{ name: 'rental_id' }],
          },
          {
            name: 'idx_fk_staff_id',
            fields: [{ name: 'staff_id' }],
          },
          {
            name: 'payment_pkey',
            unique: true,
            fields: [{ name: 'payment_id' }],
          },
        ],
      },
    )
  }
}
