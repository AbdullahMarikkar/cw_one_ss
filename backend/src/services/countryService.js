const createResponse = require("../utils/createResponse");
const axios = require("axios");

const REST_COUNTRY = "https://restcountries.com/v3.1";

async function getAllCountries() {
  try {
    const URL = `${REST_COUNTRY}/name/all?fields=name,currencies,capital,languages,flag`;
    const data = await axios.get(URL, { timeout: 10000 });
    return createResponse(true, data.data);
  } catch (err) {
    return createResponse(false, err.message);
  }
}

async function getCountryDetail(name) {
  try {
    const URL = `${REST_COUNTRY}/name/${name}?fields=name,currencies,capital,languages,flag`;
    const data = await axios.get(URL, { timeout: 10000 });
    return createResponse(true, data.data);
  } catch (err) {
    return createResponse(false, err.message);
  }
}

module.exports = { getAllCountries, getCountryDetail };
