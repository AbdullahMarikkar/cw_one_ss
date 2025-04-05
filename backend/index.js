const express = require("express");
const userService = require("./src/services/userService");
const apiKeyService = require("./src/services/apiKeyService");
const sessionMiddleware = require("./src/middleware/sessionMiddleware");
const apiKeyMiddleware = require("./src/middleware/apiKeyMiddleware");
const countryRoutes = require("./src/routes/countryRoutes");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "my_secret_",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //https only or http and https
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.post("/register", async (req, res) => {
  const result = await userService.create(req);
  res.json(result);
});

app.post("/login", async (req, res) => {
  const result = await userService.authenticate(req);
  res.json(result);
});

app.post("/logout", async (req, res) => {
  const result = await userService.logout(req);
  res.json(result);
});

app.post("/generateApiKey", sessionMiddleware, async (req, res) => {
  const result = await apiKeyService.createApiKey(req);
  res.json(result);
});

app.use("/api", sessionMiddleware, apiKeyMiddleware);

app.use("/api/country", countryRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
