const express = require("express");
const app = express();
const {Restaurant} = require("../models/index")
const db = require("../db/connection");
const { where } = require("sequelize");
const restaurantRouter = require("./routes/restaurant");

app.use(express.json())
app.use(express.urlencoded())

app.use("/restaurants", restaurantRouter)


module.exports = app;