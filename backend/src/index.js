const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db/connect-to-database");

// Routes
const itemRouter = require("./item/item.router");

const port = process.env.PORT || 3000;

async function main() {
  // Aguarda a conexão com o banco de dados
  await connectToDatabase();

  // Cria o servidor express
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Default route
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // Routers
  app.use("/item", itemRouter);

  // Inicia o servidor
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

main().catch((err) => console.error("Um erro inesperado ocorreu.\n", err));
