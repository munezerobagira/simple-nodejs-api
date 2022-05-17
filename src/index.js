import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes";
import { sequelize } from "./models";

//Environment variables

// App
const app = express();
const { PORT = 5000 } = process.env;

// middleware
app.use(express.json());

// routes
app.use("/api", routes);
app.use("*", (request, response) => {
  response.status(501).json({ message: "Uhhh this is not implemented" });
});
app.listen(PORT, async () => {
  console.log("Server has started on", PORT);
  await sequelize.authenticate();
  console.log("connected to the db");
});
