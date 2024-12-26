import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { film, filmId } from './film'
import type { rental, rentalId } from './rental'

export interface inventoryAttributes {
  inventory_id: number
  film_id: number
  store_id: number
  last_update: Date
}

export type inventoryPk = 'inventory_id'
export type inventoryId = inventory[inventoryPk]
export type inventoryOptionalAttributes = 'inventory_id' | 'last_update'
export type inventoryCreationAttributes = Optional<
  inventoryAttributes,
  inventoryOptionalAttributes
>

export class inventory
  extends Model<inventoryAttributes, inventoryCreationAttributes>
  implements inventoryAttributes
{
  inventory_id!: number
  film_id!: number
  store_id!: number
  last_update!: Date

  // inventory belongsTo film via film_id
  film!: film
  getFilm!: Sequelize.BelongsToGetAssociationMixin<film>
  setFilm!: Sequelize.BelongsToSetAssociationMixin<film, filmId>
  createFilm!: Sequelize.BelongsToCreateAssociationMixin<film>
  // inventory hasMany rental via inventory_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof inventory {
    return inventory.init(
      {
        inventory_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        film_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'film',
            key: 'film_id',
          },
        },
        store_id: {
          type: DataTypes.SMALLINT,
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
        tableName: 'inventory',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'idx_store_id_film_id',
            fields: [{ name: 'store_id' }, { name: 'film_id' }],
          },
          {
            name: 'inventory_pkey',
            unique: true,
            fields: [{ name: 'inventory_id' }],
          },
        ],
      },
    )
  }
}
