const express = require("express");
const productsRoutes = require("./products")

const { Router } = express;

const router = new Router();

router.get("/", (req, res) => res.render("main"));

router.use("/api/products", productsRoutes)

module.exports = router;
