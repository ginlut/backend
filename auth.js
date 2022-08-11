
function authMiddleware(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
}

function loginMiddleware(req, res, next) {
  if (req.session.username) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = {loginMiddleware, authMiddleware};