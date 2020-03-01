const express = require("express");
const db = require("../data/config");
const helper = require("../middleware/validateBody");

const router = express.Router();

router.get("/", async (req, res, next) => {
   try {
       const cars = await db("cars");
       res.json(cars)
   } catch (e) {
       next(e)
   }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const car = await db("cars").where({ id }).first();
        if (!car) {
            res.status(404).json({
                errorMessage: `The id of ${id}, does not match any record`
            })
        }
        res.json(car)
    } catch (e) {
        next(e)
    }
});

router.post("/", helper, async (req, res, next) => {
   try {
       const newCar = req.body;
       const [ id ] = await db("cars").insert(newCar);
       const newCarData = await db("cars").where({ id }).first();
       res.status(201).json(newCarData)
   } catch (e) {
       next(e)
   }
});

router.put("/:id", helper, async (req, res, next) => {
    try {
        const updateData = req.body;
        const { id } = req.params;
        const car = await db("cars").where({ id }).first();
        if (!car) {
            res.status(404).json({
                errorMessage: `The id of ${id}, does not match any record`
            })
        }
        const updateCar = await db("cars").where(car).update(updateData);
        res.status(202).json(updateCar)
    } catch (e) {
        next(e)
    }
});

router.delete("/:id", async (req, res, next) => {
   try {
       const { id } = req.params;
       const car = await db("cars").where({ id }).del();
       res.status(204).json(car)
   } catch (e) {
       next(e)
   }
});



module.exports = router;
