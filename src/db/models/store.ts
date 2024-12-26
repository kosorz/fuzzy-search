import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { address, addressId } from './address'
import type { staff, staffId } from './staff'

export interface storeAttributes {
  store_id: number
  manager_staff_id: number
  address_id: number
  last_update: Date
}

export type storePk = 'store_id'
export type storeId = store[storePk]
export type storeOptionalAttributes = 'store_id' | 'last_update'
export type storeCreationAttributes = Optional<
  storeAttributes,
  storeOptionalAttributes
>

export class store
  extends Model<storeAttributes, storeCreationAttributes>
  implements storeAttributes
{
  store_id!: number
  manager_staff_id!: number
  address_id!: number
  last_update!: Date

  // store belongsTo address via address_id
  address!: address
  getAddress!: Sequelize.BelongsToGetAssociationMixin<address>
  setAddress!: Sequelize.BelongsToSetAssociationMixin<address, addressId>
  createAddress!: Sequelize.BelongsToCreateAssociationMixin<address>
  // store belongsTo staff via manager_staff_id
  manager_staff!: staff
  getManager_staff!: Sequelize.BelongsToGetAssociationMixin<staff>
  setManager_staff!: Sequelize.BelongsToSetAssociationMixin<staff, staffId>
  createManager_staff!: Sequelize.BelongsToCreateAssociationMixin<staff>

  static initModel(sequelize: Sequelize.Sequelize): typeof store {
    return store.init(
      {
        store_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        manager_staff_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'staff',
            key: 'staff_id',
          },
        },
        address_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'address',
            key: 'address_id',
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
        tableName: 'store',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'idx_unq_manager_staff_id',
            unique: true,
            fields: [{ name: 'manager_staff_id' }],
          },
          {
            name: 'store_pkey',
            unique: true,
            fields: [{ name: 'store_id' }],
          },
        ],
      },
    )
  }
}
