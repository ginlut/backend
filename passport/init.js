const login =require( './login.js');
const signup =require( './signup.js');
const User = require ('../databases/models/usuario');

module.exports = function(passport){

    
    signup(passport);
    login(passport);
	//Serializar y deserializar instancias de usuario
    passport.serializeUser((user, done)=> {
        done(null, user);
    });

    passport.deserializeUser((user, done)=> {
      done(null, user);
       
    });

}