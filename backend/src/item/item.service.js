const Item = require("./item.model");

const findAll = () => Item.find();

const findById = (id) => Item.findById(id);

const create = (item) => Item.create(item);

const update = (id, item) => Item.findByIdAndUpdate(id, item);

const deleteById = (id) => Item.findByIdAndDelete(id);

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
