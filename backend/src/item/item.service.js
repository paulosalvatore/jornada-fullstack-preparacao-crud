const Item = require("./item.model");
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * Return all items from database
 */
const findAll = () => Item.find();

/**
 * Return an item by given ID
 * @param {string} id
 */
const findById = (id) => {
  const objectId = new ObjectId(id);
  return Item.findById(objectId).populate("category");
};

/**
 * Create a new item in database
 * @param {Item} item
 */
const create = (item) => Item.create(item);

/**
 * Update an item by given ID
 * @param {string} id
 * @param {Item} item
 */
const update = (id, item) => {
  const objectId = new ObjectId(id);
  return Item.findByIdAndUpdate(objectId, item);
};

/**
 * Delete an item by given ID
 * @param {string} id
 */
const deleteById = (id) => {
  const objectId = new ObjectId(id);
  return Item.findByIdAndDelete(objectId);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
