const twilio = require('twilio');
const config = require("./utils/databases/config")
const logger = require("./utils/logger")

const accounSid = "AC6255999ecfcbb84ae9122b2b6288c450";
const authToken = "9ba711cb17507a460ff10e40b3417557";
const toNumber = +56982221548;

const client = twilio(accounSid, authToken);


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
    const option = {
      to: `wahtsapp:toNumber`,
      from: +14155238886,
      body: `Se ha realizado un nuevo pedido por el usuario ${user.name}, con el email: ${user.username} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`,
    }
    const message = await client.messages.create(option)
  } catch (error) {
    logger.warn('error', error)
  }
}

module.exports ={sendNewOrder,sendWhatsApp}