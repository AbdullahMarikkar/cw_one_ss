const { v4: uuid4 } = require("uuid");
const { generateHashedKey } = require("../utils/bcryptUtil");
const apiKeyRepository = require("../repositories/apiKeyRepository");

async function createApiKey(req) {
  const userId = req.session.user.id;
  const key = uuid4();
  return await apiKeyRepository.createKey(userId, key);
}

async function validateApiKey(key) {
  const hashedKey = generateHashedKey(key);
  const result = await apiKeyRepository.getByKey(hashedKey);
  return result;
}

async function updateLastUsed(id) {
  const result = await apiKeyRepository.updateLastUsedById(id);

  return result;
}

module.exports = { createApiKey, validateApiKey, updateLastUsed };
