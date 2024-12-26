import type { Sequelize } from 'sequelize'
import { actor as _actor } from './actor'
import type { actorAttributes, actorCreationAttributes } from './actor'
import { address as _address } from './address'
import type { addressAttributes, addressCreationAttributes } from './address'
import { category as _category } from './category'
import type { categoryAttributes, categoryCreationAttributes } from './category'
import { city as _city } from './city'
import type { cityAttributes, cityCreationAttributes } from './city'
import { country as _country } from './country'
import type { countryAttributes, countryCreationAttributes } from './country'
import { customer as _customer } from './customer'
import type { customerAttributes, customerCreationAttributes } from './customer'
import { film as _film } from './film'
import type { filmAttributes, filmCreationAttributes } from './film'
import { film_actor as _film_actor } from './film_actor'
import type {
  film_actorAttributes,
  film_actorCreationAttributes,
} from './film_actor'
import { film_category as _film_category } from './film_category'
import type {
  film_categoryAttributes,
  film_categoryCreationAttributes,
} from './film_category'
import { inventory as _inventory } from './inventory'
import type {
  inventoryAttributes,
  inventoryCreationAttributes,
} from './inventory'
import { language as _language } from './language'
import type { languageAttributes, languageCreationAttributes } from './language'
import { payment as _payment } from './payment'
import type { paymentAttributes, paymentCreationAttributes } from './payment'
import { rental as _rental } from './rental'
import type { rentalAttributes, rentalCreationAttributes } from './rental'
import { staff as _staff } from './staff'
import type { staffAttributes, staffCreationAttributes } from './staff'
import { store as _store } from './store'
import type { storeAttributes, storeCreationAttributes } from './store'

export {
  _actor as actor,
  _address as address,
  _category as category,
  _city as city,
  _country as country,
  _customer as customer,
  _film as film,
  _film_actor as film_actor,
  _film_category as film_category,
  _inventory as inventory,
  _language as language,
  _payment as payment,
  _rental as rental,
  _staff as staff,
  _store as store,
}

export type {
  actorAttributes,
  actorCreationAttributes,
  addressAttributes,
  addressCreationAttributes,
  categoryAttributes,
  categoryCreationAttributes,
  cityAttributes,
  cityCreationAttributes,
  countryAttributes,
  countryCreationAttributes,
  customerAttributes,
  customerCreationAttributes,
  filmAttributes,
  filmCreationAttributes,
  film_actorAttributes,
  film_actorCreationAttributes,
  film_categoryAttributes,
  film_categoryCreationAttributes,
  inventoryAttributes,
  inventoryCreationAttributes,
  languageAttributes,
  languageCreationAttributes,
  paymentAttributes,
  paymentCreationAttributes,
  rentalAttributes,
  rentalCreationAttributes,
  staffAttributes,
  staffCreationAttributes,
  storeAttributes,
  storeCreationAttributes,
}

export function initModels(sequelize: Sequelize) {
  const actor = _actor.initModel(sequelize)
  const address = _address.initModel(sequelize)
  const category = _category.initModel(sequelize)
  const city = _city.initModel(sequelize)
  const country = _country.initModel(sequelize)
  const customer = _customer.initModel(sequelize)
  const film = _film.initModel(sequelize)
  const film_actor = _film_actor.initModel(sequelize)
  const film_category = _film_category.initModel(sequelize)
  const inventory = _inventory.initModel(sequelize)
  const language = _language.initModel(sequelize)
  const payment = _payment.initModel(sequelize)
  const rental = _rental.initModel(sequelize)
  const staff = _staff.initModel(sequelize)
  const store = _store.initModel(sequelize)

  actor.belongsToMany(film, {
    as: 'film_id_films',
    through: film_actor,
    foreignKey: 'actor_id',
    otherKey: 'film_id',
  })
  category.belongsToMany(film, {
    as: 'film_id_film_film_categories',
    through: film_category,
    foreignKey: 'category_id',
    otherKey: 'film_id',
  })
  film.belongsToMany(actor, {
    as: 'actor_id_actors',
    through: film_actor,
    foreignKey: 'film_id',
    otherKey: 'actor_id',
  })
  film.belongsToMany(category, {
    as: 'category_id_categories',
    through: film_category,
    foreignKey: 'film_id',
    otherKey: 'category_id',
  })
  film_actor.belongsTo(actor, { as: 'actor', foreignKey: 'actor_id' })
  actor.hasMany(film_actor, { as: 'film_actors', foreignKey: 'actor_id' })
  customer.belongsTo(address, { as: 'address', foreignKey: 'address_id' })
  address.hasMany(customer, { as: 'customers', foreignKey: 'address_id' })
  staff.belongsTo(address, { as: 'address', foreignKey: 'address_id' })
  address.hasMany(staff, { as: 'staffs', foreignKey: 'address_id' })
  store.belongsTo(address, { as: 'address', foreignKey: 'address_id' })
  address.hasMany(store, { as: 'stores', foreignKey: 'address_id' })
  film_category.belongsTo(category, {
    as: 'category',
    foreignKey: 'category_id',
  })
  category.hasMany(film_category, {
    as: 'film_categories',
    foreignKey: 'category_id',
  })
  address.belongsTo(city, { as: 'city', foreignKey: 'city_id' })
  city.hasMany(address, { as: 'addresses', foreignKey: 'city_id' })
  city.belongsTo(country, { as: 'country', foreignKey: 'country_id' })
  country.hasMany(city, { as: 'cities', foreignKey: 'country_id' })
  payment.belongsTo(customer, { as: 'customer', foreignKey: 'customer_id' })
  customer.hasMany(payment, { as: 'payments', foreignKey: 'customer_id' })
  rental.belongsTo(customer, { as: 'customer', foreignKey: 'customer_id' })
  customer.hasMany(rental, { as: 'rentals', foreignKey: 'customer_id' })
  film_actor.belongsTo(film, { as: 'film', foreignKey: 'film_id' })
  film.hasMany(film_actor, { as: 'film_actors', foreignKey: 'film_id' })
  film_category.belongsTo(film, { as: 'film', foreignKey: 'film_id' })
  film.hasMany(film_category, { as: 'film_categories', foreignKey: 'film_id' })
  inventory.belongsTo(film, { as: 'film', foreignKey: 'film_id' })
  film.hasMany(inventory, { as: 'inventories', foreignKey: 'film_id' })
  rental.belongsTo(inventory, { as: 'inventory', foreignKey: 'inventory_id' })
  inventory.hasMany(rental, { as: 'rentals', foreignKey: 'inventory_id' })
  film.belongsTo(language, { as: 'language', foreignKey: 'language_id' })
  language.hasMany(film, { as: 'films', foreignKey: 'language_id' })
  payment.belongsTo(rental, { as: 'rental', foreignKey: 'rental_id' })
  rental.hasMany(payment, { as: 'payments', foreignKey: 'rental_id' })
  payment.belongsTo(staff, { as: 'staff', foreignKey: 'staff_id' })
  staff.hasMany(payment, { as: 'payments', foreignKey: 'staff_id' })
  rental.belongsTo(staff, { as: 'staff', foreignKey: 'staff_id' })
  staff.hasMany(rental, { as: 'rentals', foreignKey: 'staff_id' })
  store.belongsTo(staff, {
    as: 'manager_staff',
    foreignKey: 'manager_staff_id',
  })
  staff.hasMany(store, { as: 'stores', foreignKey: 'manager_staff_id' })

  return {
    actor: actor,
    address: address,
    category: category,
    city: city,
    country: country,
    customer: customer,
    film: film,
    film_actor: film_actor,
    film_category: film_category,
    inventory: inventory,
    language: language,
    payment: payment,
    rental: rental,
    staff: staff,
    store: store,
  }
}
