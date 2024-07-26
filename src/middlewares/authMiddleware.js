const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const session = await prisma.session.findUnique({ where: { token } });
    if (!session) {
      return res.status(401).json({ message: 'Invalid session' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Invalid token' });
  }
};
