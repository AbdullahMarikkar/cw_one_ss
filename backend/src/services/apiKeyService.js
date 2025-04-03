const { v4: uuid4 } = require("uuid");
const apiKeyRepository = require("../repositories/apiKeyRepository");

async function createApiKey(req) {
  const userId = req.session.user.id;
  const key = uuid4();

  return await apiKeyRepository.createKey(userId, key);
}

async function validateApiKey(key) {
  const result = await apiKeyRepository.getByKey(key);

  return result;
}

module.exports = { createApiKey, validateApiKey };
