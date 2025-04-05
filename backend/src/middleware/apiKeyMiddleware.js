const apiKeyService = require("../services/apiKeyService");

async function apiKeyMiddleware(req, res, next) {
  const key = req.header("X-API-Key");

  if (!key) {
    return res.status(401).json({
      error: "API Key Missing",
    });
  }

  try {
    const result = await apiKeyService.validateApiKey(key);

    if (!result.success) {
      return res.status(403).json({
        error: "Invalid key",
      });
    }
    await apiKeyService.updateLastUsed(result.data.id);

    next();
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

module.exports = apiKeyMiddleware;
