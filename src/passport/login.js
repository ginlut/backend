let LocalStrategy   = require('passport-local').Strategy;
let User = require('../utils/databases/models/usuario.model');
let bCrypt = require('bcrypt');

module.exports= function (passport){

	passport.use('login', new LocalStrategy({
        passReqToCallback : true
        },
        async (req, username, password, done) => {
        try { 
            const user = await User.findOne({ 'username' :  username });
            if (!user || !isValidPassword(user, password)) {
                return done("Usario y/o contraseña inválidos", false);
            }
            return done(null, user);
            
        } catch (err) {
                done(err);
        }
        
        })
    );

    function isValidPassword (user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}