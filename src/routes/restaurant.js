const {Router} = require("express");
const Restaurant = require("../../models/index")


const restaurantRouter = Router();

restaurantRouter.get("/", async (req, res) => {
    const allRestaurants = await Restaurant.findAll()
    res.json(allRestaurants)
})

restaurantRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const theRestaurant = await Restaurant.findByPk(id);
    res.json(theRestaurant)
})

restaurantRouter.post("/", async (req, res) => {
    const {name, location, cuisine} = req.body
    console.log(name, location, cuisine)
    const newRestaurant = await Restaurant.create({
        name: name,
        location: location,
        cuisine: cuisine
    })
    res.json(newRestaurant)
})

restaurantRouter.put("/:id", async (req, res) => {
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

restaurantRouter.delete("/:id", async (req, res) => {
    const toDeleteId = req.params.id
    await Restaurant.destroy({
        where: {id: toDeleteId}
    })
    res.send("Done deleting!")
})

module.exports = restaurantRouter