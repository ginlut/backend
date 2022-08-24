let LocalStrategy   = require('passport-local').Strategy;
let User = require('../databases/models/usuario.js');
let bCrypt = require('bcrypt');

//Estrategia de Login/acceso
module.exports= function (passport){

	passport.use('login', new LocalStrategy({
        passReqToCallback : true //nos permite acceder al objeto request
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

   //Desencriptar Password (cifrado)
    function isValidPassword (user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}