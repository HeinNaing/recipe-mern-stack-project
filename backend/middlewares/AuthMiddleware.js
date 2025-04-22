const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const AuthMiddleware = async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized',
          error: err.message,
        });
      } else {
        req.user = decoded._id;
        User.findById(decoded._id)
          .then((user) => {
            req.user = user;
            if (!user) {
              return res.status(401).json({
                message: 'Unauthorized',
              });
            } else {
              req.user = user;
              next();
            }
          })
          .catch((err) => {
            return res.status(500).json({
              message: 'Internal server error',
              error: err.message,
            });
          });
      }
    });
  } else {
    return res.status(400).json({
      message: 'token need to provide',
    });
  }
};
module.exports = AuthMiddleware;
