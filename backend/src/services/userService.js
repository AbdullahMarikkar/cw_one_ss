const userRepository = require("../repositories/userRepository");
const { generateHash, verify } = require("../utils/bcryptUtil");
const createResponse = require("../utils/createResponse");

async function create(req) {
  try {
    req.body.password = await generateHash(req.body.password);
    const result = await userRepository.createUser(req);
    return result;
  } catch (ex) {
    console.error(ex);
  }
}

async function authenticate(req) {
  try {
    const result = await userRepository.getByEmail(req);
    if (!result) {
      return { message: "No User Found" };
    }
    const isMatch = await verify(req.body.password, result.data.password);
    if (isMatch) {
      req.session.user = {
        id: result.data.id,
        email: result.data.email,
        name: result.data.fn,
      };
      req.session.isAuthenticated = true;
      return { message: "Logged In Successfully" };
    }
  } catch (ex) {}
}

module.exports = { authenticate, create };
