const request = require("supertest");
const app = require("../src/app")

describe("The app's", () => {
    it("GET restaurants returns 200", async () => {
        const response = await request(app).get("/restaurants")
        expect(response.statusCode).toEqual(200)
    })
    it("GET restaurants returns an array of restaurants", async () => {
        const response = await request(app).get("/restaurants")
        expect(Array.isArray(response.body)).toBe(true);
    })
    it("GET restaurants returns the correct number of items", async () => {
        const response = await request(app).get("/restaurants")
        expect(response.body.length).toBe(3);
    })
    it("GET restaurants returns the correct restaurant data", async () => {
        const response = await request(app).get("/restaurants");
    
        const simplifiedData = response.body.map(restaurant => ({
            name: restaurant.name,
            location: restaurant.location,
            cuisine: restaurant.cuisine
        }));
    
        expect(simplifiedData).toEqual([
            {
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            },
            {
                name: "LittleSheep",
                location: "Dallas",
                cuisine: "Hotpot"
            },
            {
                name: "Spice Grill",
                location: "Houston",
                cuisine: "Indian"
            }
        ]);
    });

    it("GET restaurants returns the correct restaurant data", async () => {
        const response = await request(app).get("/restaurants/1");
    
        const simplifiedData = {
            name: response.body.name,
            location: response.body.location,
            cuisine: response.body.cuisine
        };
    
        expect(simplifiedData).toEqual(
            {
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            },
        );
    });

    it("POST restaurants returns the newly updated array", async () => {
        const response = await request(app).post("/restaurants").send({
            name: "KFC",
            location: "London",
            cuisine: "FastFood"
        });
    
        const simplifiedData = response.body.map(restaurant => ({
            name: restaurant.name,
            location: restaurant.location,
            cuisine: restaurant.cuisine
        }));
    
        expect(simplifiedData).toEqual([
            {
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            },
            {
                name: "LittleSheep",
                location: "Dallas",
                cuisine: "Hotpot"
            },
            {
                name: "Spice Grill",
                location: "Houston",
                cuisine: "Indian"
            },
            {
                name: "KFC",
                location: "London",
                cuisine: "FastFood"
            }
        ]);
    });

    it("PUT restaurants returns the newly updated array", async () => {
        const response = await request(app).put("/restaurants/1").send({
            name: "AppleBees",
            location: "American",
            cuisine: "FastFood"
        });
    
        const simplifiedData = response.body.map(restaurant => ({
            name: restaurant.name,
            location: restaurant.location,
            cuisine: restaurant.cuisine
        }));
    
        expect(simplifiedData).toEqual([
            {
                name: "AppleBees",
                location: "American",
                cuisine: "FastFood"
            },
            {
                name: "LittleSheep",
                location: "Dallas",
                cuisine: "Hotpot"
            },
            {
                name: "Spice Grill",
                location: "Houston",
                cuisine: "Indian"
            },
            {
                name: "KFC",
                location: "London",
                cuisine: "FastFood"
            }
        ]);
        const editBack = await request(app).put("/restaurants/1").send({
            name: "AppleBees",
            location: "Texas",
            cuisine: "FastFood"
        });
        
    });

    it("DELETE restaurants returns array without deleted content", async () => {
        const responseArray = await request(app).get("/restaurants")

        const length = responseArray.body.length
        const lastRestaurant = responseArray.body[length - 1];
        const lastRestaurantId = lastRestaurant.id;
        const response = await request(app).delete(`/restaurants/${lastRestaurantId}`);
        const simplifiedData = response.body.map(restaurant => ({
            name: restaurant.name,
            location: restaurant.location,
            cuisine: restaurant.cuisine
        }));
    
        expect(simplifiedData).toEqual([
            {
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            },
            {
                name: "LittleSheep",
                location: "Dallas",
                cuisine: "Hotpot"
            },
            {
                name: "Spice Grill",
                location: "Houston",
                cuisine: "Indian"
            }
        ]);
        
    });

})