// const mongoose = require("mongoose");
const service = require("./item.service");
const { isObjectIdValid } = require("../db/database.helper");

/**
 * @param {Request} req
 * @param {Response} res
 */
const findAll = async (req, res) => {
  const items = await service.findAll();
  res.send(items);
};

const findById = async (req, res) => {
  const id = req.params.id;

  if (!isObjectIdValid(id)) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  const item = await service.findById(id);

  if (!item) {
    return res.status(404).send({ message: "Item não encontrado!" });
  }

  res.send(item);
};

module.exports = {
  findAll,
  findById,
};
