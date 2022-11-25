const express = require("express");
const service = require("./category.service");
const { isObjectIdValid } = require("../db/database.helper");

/**
 * Return all categories from database
 * @param {express.Request} req
 * @param {express.Response} res
 */
const findAll = async (req, res) => {
  const categories = await service.findAll();
  res.send(categories);
};

/**
 * Return a category by given ID
 * @param {express.Request} req
 * @param {express.Response} res
 */
const findById = async (req, res) => {
  const id = req.params.id;

  if (!isObjectIdValid(id)) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  const category = await service.findById(id);

  if (!category) {
    return res.status(404).send({ message: "Categoria não encontrada!" });
  }

  res.send(category);
};

/**
 * Create a new category in database
 * @param {express.Request} req
 * @param {express.Response} res
 */
const create = async (req, res) => {
  const category = req.body;

  // Validate object
  if (!category || !category.name) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }

  const newCategory = await service.create(category);

  res.status(201).send(newCategory);
};

/**
 * Update a category by given ID
 * @param {express.Request} req
 * @param {express.Response} res
 */
const update = async (req, res) => {
  const id = req.params.id;
  const category = req.body;

  if (!isObjectIdValid(id)) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  if (!category || !category.name) {
    return res.status(400).send({ message: "Dados inválidos!" });
  }

  const updatedCategory = await service.update(id, category);

  if (!updatedCategory) {
    return res.status(404).send({ message: "Item não encontrado!" });
  }

  res.send({ message: "Categoria atualizada com sucesso!" });
};

/**
 * Delete a category by given ID
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteById = async (req, res) => {
  const id = req.params.id;

  if (!isObjectIdValid(id)) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  const category = await service.deleteById(id);

  if (!category) {
    return res.status(404).send({ message: "Categoria não encontrada!" });
  }

  res.send({ message: "Categoria excluída com sucesso!" });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
