function auth(req, res, next) {
  if (req.session.name) {
    next();
  } else {
    res.redirect("/login");
  }
}

function login(req, res, next) {
  if (req.session.name) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = {login, auth};