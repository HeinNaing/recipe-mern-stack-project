const userControllers = require('../controllers/UserController');
const handleErrorMessage = require('../middlewares/handleErrorMessage');
const { body } = require('express-validator');
const express = require('express');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.get('/', userControllers.getUsers);
router.get('/me', AuthMiddleware, userControllers.me);

router.post('/login', userControllers.login);
router.post(
  '/register',
  [
    body('username').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty(),
  ],
  handleErrorMessage,
  userControllers.register
);

module.exports = router;
