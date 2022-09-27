const twilio = require('twilio');
const config = require("./utils/databases/config")
const logger = require("./utils/logger")

const accountSid = "AC6255999ecfcbb84ae9122b2b6288c450";
const authToken = "da3b509cd2fc635b404e613acb581da9";
const toNumber = +56982221548;
const client = twilio(accountSid, authToken);


const sendNewOrder = async (order, user) => {
  try {
    const option = {
      to: toNumber,
      from: +14155238886,
      body: `Se ha realizado un nuevo pedido por el usuario ${user.name}, con el email: ${user.username} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`,
    }
    const message = await client.messages.create(option)

  } catch (error) {
    logger.warn('error', error)
  }
}

const sendWhatsApp = async (order, user) => {
  try {
    client.messages 
      .create({ 
          body: `Se ha realizado un nuevo pedido por el usuario ${user.name}, con el email: ${user.username} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`, 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+56982221548' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
  } catch (error) {
    logger.warn('error', error)
  }
}

module.exports ={sendNewOrder,sendWhatsApp}