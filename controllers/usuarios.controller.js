const logger = require("../src/utils/logs/logger")

class UsersController {

  async getAcount(req, res) {
    res.render('user', { user: req.user })
  }
  async home(req, res) {
    res.redirect('/')
  }
  async failedLogin(req, res) {
    res.sendFile(path.join(__dirname, "../public/plantillas/faillogin.html"))
  }
  async signup (req, res){
    res.sendFile(path.join(__dirname, "../public/plantillas/signup.html"))
  }
  async filedSignup (req, res) {
    res.sendFile(path.join(__dirname, "../public/plantillas/failedSignup.html"));
  }
  async logout (req, res, next) {
    req.logout(function(err) {
      if (err) {     
        logger.console.warn(err); 
        return next(err); }
    });
    res.redirect('/')
  }

}

module.exports = UsersController
 