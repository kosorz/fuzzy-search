import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { actor, actorId } from './actor'
import type { category, categoryId } from './category'
import type { film_actor, film_actorId } from './film_actor'
import type { film_category, film_categoryId } from './film_category'
import type { inventory, inventoryId } from './inventory'
import type { language, languageId } from './language'

export interface filmAttributes {
  film_id: number
  title: string
  description?: string
  release_year?: number
  language_id: number
  rental_duration: number
  rental_rate: number
  length?: number
  replacement_cost: number
  rating?: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'
  last_update: Date
  special_features?: string[]
  fulltext: string
}

export type filmPk = 'film_id'
export type filmId = film[filmPk]
export type filmOptionalAttributes =
  | 'film_id'
  | 'description'
  | 'release_year'
  | 'rental_duration'
  | 'rental_rate'
  | 'length'
  | 'replacement_cost'
  | 'rating'
  | 'last_update'
  | 'special_features'
export type filmCreationAttributes = Optional<
  filmAttributes,
  filmOptionalAttributes
>

export class film
  extends Model<filmAttributes, filmCreationAttributes>
  implements filmAttributes
{
  film_id!: number
  title!: string
  description?: string
  release_year?: number
  language_id!: number
  rental_duration!: number
  rental_rate!: number
  length?: number
  replacement_cost!: number
  rating?: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'
  last_update!: Date
  special_features?: string[]
  fulltext!: string

  // film belongsToMany actor via film_id and actor_id
  actor_id_actors!: actor[]
  getActor_id_actors!: Sequelize.BelongsToManyGetAssociationsMixin<actor>
  setActor_id_actors!: Sequelize.BelongsToManySetAssociationsMixin<
    actor,
    actorId
  >
  addActor_id_actor!: Sequelize.BelongsToManyAddAssociationMixin<actor, actorId>
  addActor_id_actors!: Sequelize.BelongsToManyAddAssociationsMixin<
    actor,
    actorId
  >
  createActor_id_actor!: Sequelize.BelongsToManyCreateAssociationMixin<actor>
  removeActor_id_actor!: Sequelize.BelongsToManyRemoveAssociationMixin<
    actor,
    actorId
  >
  removeActor_id_actors!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    actor,
    actorId
  >
  hasActor_id_actor!: Sequelize.BelongsToManyHasAssociationMixin<actor, actorId>
  hasActor_id_actors!: Sequelize.BelongsToManyHasAssociationsMixin<
    actor,
    actorId
  >
  countActor_id_actors!: Sequelize.BelongsToManyCountAssociationsMixin
  // film belongsToMany category via film_id and category_id
  category_id_categories!: category[]
  getCategory_id_categories!: Sequelize.BelongsToManyGetAssociationsMixin<category>
  setCategory_id_categories!: Sequelize.BelongsToManySetAssociationsMixin<
    category,
    categoryId
  >
  addCategory_id_category!: Sequelize.BelongsToManyAddAssociationMixin<
    category,
    categoryId
  >
  addCategory_id_categories!: Sequelize.BelongsToManyAddAssociationsMixin<
    category,
    categoryId
  >
  createCategory_id_category!: Sequelize.BelongsToManyCreateAssociationMixin<category>
  removeCategory_id_category!: Sequelize.BelongsToManyRemoveAssociationMixin<
    category,
    categoryId
  >
  removeCategory_id_categories!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    category,
    categoryId
  >
  hasCategory_id_category!: Sequelize.BelongsToManyHasAssociationMixin<
    category,
    categoryId
  >
  hasCategory_id_categories!: Sequelize.BelongsToManyHasAssociationsMixin<
    category,
    categoryId
  >
  countCategory_id_categories!: Sequelize.BelongsToManyCountAssociationsMixin
  // film hasMany film_actor via film_id
  film_actors!: film_actor[]
  getFilm_actors!: Sequelize.HasManyGetAssociationsMixin<film_actor>
  setFilm_actors!: Sequelize.HasManySetAssociationsMixin<
    film_actor,
    film_actorId
  >
  addFilm_actor!: Sequelize.HasManyAddAssociationMixin<film_actor, film_actorId>
  addFilm_actors!: Sequelize.HasManyAddAssociationsMixin<
    film_actor,
    film_actorId
  >
  createFilm_actor!: Sequelize.HasManyCreateAssociationMixin<film_actor>
  removeFilm_actor!: Sequelize.HasManyRemoveAssociationMixin<
    film_actor,
    film_actorId
  >
  removeFilm_actors!: Sequelize.HasManyRemoveAssociationsMixin<
    film_actor,
    film_actorId
  >
  hasFilm_actor!: Sequelize.HasManyHasAssociationMixin<film_actor, film_actorId>
  hasFilm_actors!: Sequelize.HasManyHasAssociationsMixin<
    film_actor,
    film_actorId
  >
  countFilm_actors!: Sequelize.HasManyCountAssociationsMixin
  // film hasMany film_category via film_id
  film_categories!: film_category[]
  getFilm_categories!: Sequelize.HasManyGetAssociationsMixin<film_category>
  setFilm_categories!: Sequelize.HasManySetAssociationsMixin<
    film_category,
    film_categoryId
  >
  addFilm_category!: Sequelize.HasManyAddAssociationMixin<
    film_category,
    film_categoryId
  >
  addFilm_categories!: Sequelize.HasManyAddAssociationsMixin<
    film_category,
    film_categoryId
  >
  createFilm_category!: Sequelize.HasManyCreateAssociationMixin<film_category>
  removeFilm_category!: Sequelize.HasManyRemoveAssociationMixin<
    film_category,
    film_categoryId
  >
  removeFilm_categories!: Sequelize.HasManyRemoveAssociationsMixin<
    film_category,
    film_categoryId
  >
  hasFilm_category!: Sequelize.HasManyHasAssociationMixin<
    film_category,
    film_categoryId
  >
  hasFilm_categories!: Sequelize.HasManyHasAssociationsMixin<
    film_category,
    film_categoryId
  >
  countFilm_categories!: Sequelize.HasManyCountAssociationsMixin
  // film hasMany inventory via film_id
  inventories!: inventory[]
  getInventories!: Sequelize.HasManyGetAssociationsMixin<inventory>
  setInventories!: Sequelize.HasManySetAssociationsMixin<inventory, inventoryId>
  addInventory!: Sequelize.HasManyAddAssociationMixin<inventory, inventoryId>
  addInventories!: Sequelize.HasManyAddAssociationsMixin<inventory, inventoryId>
  createInventory!: Sequelize.HasManyCreateAssociationMixin<inventory>
  removeInventory!: Sequelize.HasManyRemoveAssociationMixin<
    inventory,
    inventoryId
  >
  removeInventories!: Sequelize.HasManyRemoveAssociationsMixin<
    inventory,
    inventoryId
  >
  hasInventory!: Sequelize.HasManyHasAssociationMixin<inventory, inventoryId>
  hasInventories!: Sequelize.HasManyHasAssociationsMixin<inventory, inventoryId>
  countInventories!: Sequelize.HasManyCountAssociationsMixin
  // film belongsTo language via language_id
  language!: language
  getLanguage!: Sequelize.BelongsToGetAssociationMixin<language>
  setLanguage!: Sequelize.BelongsToSetAssociationMixin<language, languageId>
  createLanguage!: Sequelize.BelongsToCreateAssociationMixin<language>

  static initModel(sequelize: Sequelize.Sequelize): typeof film {
    return film.init(
      {
        film_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        release_year: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        language_id: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          references: {
            model: 'language',
            key: 'language_id',
          },
        },
        rental_duration: {
          type: DataTypes.SMALLINT,
          allowNull: false,
          defaultValue: 3,
        },
        rental_rate: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 4.99,
        },
        length: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        replacement_cost: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 19.99,
        },
        rating: {
          type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
          allowNull: true,
          defaultValue: 'G',
        },
        last_update: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now'),
        },
        special_features: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          allowNull: true,
        },
        fulltext: {
          type: 'TSVECTOR',
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'film',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'film_fulltext_idx',
            fields: [{ name: 'fulltext' }],
          },
          {
            name: 'film_pkey',
            unique: true,
            fields: [{ name: 'film_id' }],
          },
          {
            name: 'idx_fk_language_id',
            fields: [{ name: 'language_id' }],
          },
          {
            name: 'idx_title',
            fields: [{ name: 'title' }],
          },
        ],
      },
    )
  }
}
