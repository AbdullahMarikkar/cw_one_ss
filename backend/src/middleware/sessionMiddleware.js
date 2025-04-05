function checkSession(req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.status(401).json({ error: "Invalid User!" });
    // res.redirect("/login");
  }
  next();
}

module.exports = checkSession;
