const admin = require ('firebase-admin');
const config = require("./config");

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
});

console.log('Base Firebase Conectada');

module.exports =  admin;
