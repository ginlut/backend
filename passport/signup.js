const LocalStrategy   = require('passport-local').Strategy;
const User =require( '../databases/models/usuario.js');
const bCrypt  =require( 'bcrypt');

module.exports = function (passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true 
        },
        async (req, username, password, done)=> {
            console.log('Hola')
            try {
                const existingUser = User.findOne({ 'username' :  username }, 
                    (err, user)=> {
                        if (err){
                            return done(err);
                        }
                        if (user) {
                            return done(null, false);
                        } else {
                            const newUser = {
                                username: req.body.username,
                                password: hashPassword(password),
                                name: req.body.name,
                                address: req.body.address,
                                age: req.body.age,
                                phone: req.body.phone,
                                picture: req.body.picture,  
                                
                            };
                            const createdUser = User.create(newUser);
                            return done(null, createdUser);
                        }
                }).clone()    
            } catch (err) {
                console.log(err);
                done(err);
            }
        
        })
            
     );
            
    function hashPassword(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }  

}