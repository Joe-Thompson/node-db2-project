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

router.post("/:id/sales", async (req, res, next) => {
   try {
       const  [id]  = req.params.id;
       const vin_id = await db("cars").where({ id });
       const sale  = {
           ...req.body,
           vin_sale: vin_id[0].vin
       };
       console.log(vin_id);
       console.log(sale);
     const newSale = await db("sales").insert(sale);
     res.status(201).json(newSale)
   } catch (e) {
       next(e)
   }
});

router.get("/:id/sales", async (req, res, next) => {
    try {
        const { id } = req.params;
        const car = await db("cars").where({ id }).first();
        const vin = await db("cars").where({ id }).select("vin");
        const sales = await db("sales").where({vin_sale: vin[0].vin});
        console.log(car);
        res.status(200).json([car, sales[0]]);
    } catch (e) {
        next(e)
    }
});



module.exports = router;
