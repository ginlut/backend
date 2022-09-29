const logger =require("../src/utils/logger")

const ContenedorUsuarios = async (req, res) => {
  try {
    const user = req.user
    res.render('user', { user })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting user' })
  }
}

module.exports = ContenedorUsuarios
