// const mongoose = require("mongoose");
const service = require("./item.service");

/**
 * @param {Request} req
 * @param {Response} res
 */
const findAll = async (req, res) => {
  const items = await service.findAll();
  res.send(items);
};

module.exports = {
  findAll,
};
