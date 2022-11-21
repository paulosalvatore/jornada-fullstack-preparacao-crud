const mongoose = require("mongoose");

function connectToDatabase() {
  return mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Banco de dados conectado com sucesso."))
    .catch((err) => console.log("Erro na conexao com o banco.\n", err));
}

module.exports = {
  connectToDatabase,
};
