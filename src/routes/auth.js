const express = require("express");

const { Router } = express;

const router = new Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Creating a session.
router.post("/", (req, res) => {
  const { name } = req.body;
  req.session.name = name;
  res.redirect("/");
});

// Destroying a session.
router.delete("/", (req, res) => {
  const { name } = req.session;
  req.session.destroy(() => res.json({ name }));
});

module.exports = router;
