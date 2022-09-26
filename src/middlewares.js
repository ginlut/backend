function auth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
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