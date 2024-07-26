const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/check-session', authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
  });
  

module.exports = router;
