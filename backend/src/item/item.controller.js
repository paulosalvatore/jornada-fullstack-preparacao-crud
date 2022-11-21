const express = require("express");
const service = require("./item.service");
const { isObjectIdValid } = require("../db/database.helper");

/**
 * Return all items from database
 * @param {express.Request} req
 * @param {express.Response} res
 */
const findAll = async (req, res) => {
  const items = await service.findAll();
  res.send(items);
};

/**
 * Return an item by given ID
 * @param {express.Request} req
 * @param {express.Response} res
 */
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

/**
 * Create a new item in database
 * @param {express.Request} req
 * @param {express.Response} res
 */
const create = async (req, res) => {
  const item = req.body;

  // Validate object
  if (!item || !item.nome || !item.imagemUrl) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }

  const newItem = await service.create(item);

  res.status(201).send(newItem);
};

/**
 * Update an item by given ID
 * @param {express.Request} req
 * @param {express.Response} res
 */
const update = async (req, res) => {
  const id = req.params.id;
  const item = req.body;

  if (!isObjectIdValid(id)) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  if (!item || !item.nome || !item.imagemUrl) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }

  const updatedItem = await service.update(id, item);

  if (!updatedItem) {
    return res.status(404).send({ message: "Item não encontrado!" });
  }

  res.send({ message: "Item atualizado com sucesso!" });
};

/**
 * Delete an item by given ID
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteById = async (req, res) => {
  const id = req.params.id;

  if (!isObjectIdValid(id)) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  const item = await service.deleteById(id);

  if (!item) {
    return res.status(404).send({ message: "Item não encontrado!" });
  }

  res.send({ message: "Item excluído com sucesso!" });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
