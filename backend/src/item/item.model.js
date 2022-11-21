const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  imagemUrl: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
