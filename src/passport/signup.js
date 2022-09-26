const LocalStrategy   = require('passport-local').Strategy;
const User =require( '../utils/databases/models/usuario.js');
const bCrypt  =require( 'bcrypt');
const transporter = require("../nodemailer")
require("dotenv").config();

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
                                avatar:`http://localhost:8080/image/${req.file.filename}`,  
                            };
                            const mailOptions = {
                                from: "Servidor Node",
                                to: "eryn57@ethereal.email",
                                subject: "Nuevo registro",
                                html: `<h1>Nuevo usuario:</h1>
                                <h2>Email: ${newUser.username}</h2>
                                <h2>Nombre: ${newUser.name}</h2>
                                <h2>Dirección: ${newUser.address}</h2>
                                <h2>Edad: ${newUser.age}</h2>
                                <h2>Telf: ${newUser.phone}</h2>
                                <h2>Avatar: ${newUser.avatar}</h2>`,
                              };
                              
                              async function enviarInfo() {
                                const info = await transporter.sendMail(mailOptions);
                                console.log(info);
                              }
                              try {
                                enviarInfo()
                              } catch (error) {
                                console.log(error);
                              } 
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