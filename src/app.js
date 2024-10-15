const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const { where } = require("sequelize");

app.use(express.json())
app.use(express.urlencoded())


//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const allRestaurants = await Restaurant.findAll()
    res.json(allRestaurants)
})

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const theRestaurant = await Restaurant.findByPk(id);
    res.json(theRestaurant)
})

app.post("/restaurants/", async (req, res) => {
    const {name, location, cuisine} = req.body
    console.log(name, location, cuisine)
    await Restaurant.create({
        name: name,
        location: location,
        cuisine: cuisine
    })
    res.send(`Added ${name, location, cuisine} to your list of restaurants!`)
})

app.put("/restaurants/:id", async (req, res) => {
    const {name, location, cuisine} = req.body
    const toChangeId = req.params.id
    await Restaurant.update({
        name: name,
        location: location,
        cuisine: cuisine
    },{
        where: {id: toChangeId}
    })
    res.send("Done changing!")
})

app.delete("/restaurants/:id", async (req, res) => {
    const toDeleteId = req.params.id
    await Restaurant.destroy({
        where: {id: toDeleteId}
    })
    res.send("Done deleting!")
})



module.exports = app;