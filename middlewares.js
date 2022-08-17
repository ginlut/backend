function auth(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
}

function login(req, res, next) {
  if (req.session.username) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = {login, auth};