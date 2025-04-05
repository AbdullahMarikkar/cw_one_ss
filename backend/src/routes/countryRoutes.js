const express = require("express");
const countryService = require("../services/countryService");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await countryService.getAllCountries();
  res.json(result);
});

router.get("/:name", async (req, res) => {
  const name = req.params.name;
  const result = await countryService.getCountryDetail(name);
  res.json(result);
});

module.exports = router;
