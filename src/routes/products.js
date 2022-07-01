const express = require("express");
const { faker } = require("@faker-js/faker");

const { Router } = express;

const router = new Router();

// Get products.
router.get("/", (req, res) => {
  const { quantity = 5 } = req.query;

  let data = [];
  
  for (let i = 0; i < quantity; i++) {
    const doc = {
      id: faker.random.alphaNumeric(5),
      title: faker.commerce.productName(),
      thumbnail: faker.image.business(640, 480, true),
      price: faker.commerce.price(100, 200, 2),
    };
    data.push(doc);
  }
  res.json(data);
});

module.exports = router;
