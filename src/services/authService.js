const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { JWT_SECRET } = process.env;

exports.register = async (email, username, password) => {
    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
          },
        });
        return user;
    } catch (error) {
     console.log(error)   
    }
};

exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  // Invalidate all existing sessions
  await prisma.session.deleteMany({ where: { userId: user.id } });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  // Create a new session
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
    },
  });

  return token;
};

exports.logout = async (token) => {
  await prisma.session.delete({ where: { token } });
};
