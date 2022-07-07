const express = require("express");
const productsRoutes = require("./products");
const authRoutes = require("./auth");

const { Router } = express;

const router = new Router();

// Rendering main view (products table & messages).
router.get(
  "/",
  (req, res, next) => {
    const { name } = req.session;
    if (!name) {
      res.redirect("/login");
    } else {
      next();
    }
  },
  (req, res) => res.render("main", { name: req.session.name })
);

// Rendering log-in form.
router.get(
  "/login",
  (req, res, next) => {
    const { name } = req.session;
    if (name) {
      res.redirect("/");
    } else {
      next();
    }
  },
  (req, res) => res.render("login")
);

router.get("/logout", (req, res) => res.render("logout"));

router.use("/api/auth", authRoutes);

router.use("/api/products", productsRoutes);

module.exports = router;
