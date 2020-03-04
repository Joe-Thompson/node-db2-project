const express = require("express");
const helmet = require("helmet");
const welcomeRouter = require("./Welcome/welcomeRouter");
const inventoryRouter = require("./Inventory/inventoryRouter");

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(express.json());

server.use("/", welcomeRouter);
server.use("/cars", inventoryRouter);

server.use((err, req, res, next) => {
   console.log(err);
   res.status(500).json({
       message: "Server error, please try again"
   })
});


server.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`)
});



