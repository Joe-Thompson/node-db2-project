const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
   res.json({
       message: "Welcome to Zielinski Automotive, car's for the American working man"
   })
});

module.exports = router;
