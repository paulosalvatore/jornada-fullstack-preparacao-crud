const Category = require("./category.model");
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * Return all categories from database
 */
const findAll = () => Category.find().sort({ name: 1 });

/**
 * Return a category by given ID
 * @param {string} id
 */
const findById = (id) => {
  const objectId = new ObjectId(id);
  return Category.findById(objectId);
};

/**
 * Create a new category in database
 * @param {Category} category
 */
const create = (category) => Category.create(category);

/**
 * Update a category by given ID
 * @param {string} id
 * @param {Category} category
 */
const update = (id, category) => {
  const objectId = new ObjectId(id);
  return Category.findByIdAndUpdate(objectId, category);
};

/**
 * Delete a category by given ID
 * @param {string} id
 */
const deleteById = (id) => {
  const objectId = new ObjectId(id);
  return Category.findByIdAndDelete(objectId);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
