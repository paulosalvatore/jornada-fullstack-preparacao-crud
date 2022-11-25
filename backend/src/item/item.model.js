const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  imagemUrl: { type: String, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
