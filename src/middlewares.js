const path = require("path");

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))
  }
}

function login(req, res, next) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
}

function checkAuth(req, res, next) {
  if (req.session.user) {
    return next();
  }

  res.json({
    error: true,
    message: "you dont have permission to visit this page",
  });
}

module.exports = {login, auth, checkAuth};