const { default: createResponse } = require("../utils/createResponse");

async function getAllCountries() {
  console.log("This is getAll Countries Service");
  return createResponse(true, "all Countries");
}
