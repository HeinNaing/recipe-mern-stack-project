const JWT = require('jsonwebtoken');

module.exports = function createToken(_id) {
  const token = JWT.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};
