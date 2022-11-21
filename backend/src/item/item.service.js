const Item = require("./item.model");

const findAll = () => Item.find();

module.exports = {
  findAll,
};
