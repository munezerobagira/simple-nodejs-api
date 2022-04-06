import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 5000;

// database

mongoose
  .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  });

// middleware
app.use(express.json());

// routes
app.use("/api", routes);
app.listen(port, () => {
  console.log("Server has started!");
});
