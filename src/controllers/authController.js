const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = await authService.register(email, username, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.token;
  await authService.logout(token);
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};
