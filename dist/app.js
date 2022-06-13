// 3rd Party Modules
import express from "express";
// Local Modules
// const myRoute = require("./routes/myRoute.js");
// Server Initialization
const app = express();
// Middlewares
app.use(express.json());
// Routes will be written here
// app.use("/route", myRoute);
export default app;
