const express = require("express");
const countryService = require("../services/countryService");
const router = express.Router();

router.get("/", (req, res) => {
  const result = countryService.getAllCountries();

  res.json({ result });
});

module.exports = router;
