const Sequelize = require("sequelize");
const db = require("../db/connection");

const Item = db.define("items", {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.STRING,
    vegetarian: Sequelize.STRING,

})
module.exports = Item;