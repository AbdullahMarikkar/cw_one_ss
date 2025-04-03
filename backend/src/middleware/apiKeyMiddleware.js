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

    if (!data.success) {
      return res.status(403).json({
        error: "Invalid key",
      });
    }
    // TODO : Update Last Used Field of API key
    req.key = result.data;
    next();
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

module.exports = apiKeyMiddleware;
