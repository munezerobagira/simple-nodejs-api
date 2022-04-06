import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

//Environment variables
import dotenv from "dotenv";
dotenv.config();

// App
const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

// database

mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(() => {
  console.log("Database connected");
});

// middleware
app.use(express.json());

// routes
app.use("/api", routes);
app.listen(port, () => {
  console.log("Server has started!");
});
