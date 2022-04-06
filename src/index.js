import express from "express";
import mongoose from "mongoose";
const app = express();
import routes from "./routes";
mongoose
  .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
  .then(() => {
    app.use(express.json());
    app.use("/api", routes);
    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
