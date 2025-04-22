const User = require('../models/User');
const bcrypt = require('bcrypt');
const { APIFeatures } = require('../utils/APIFeatures.js');
const createToken = require('../helpers/createToken.js');

const userControllers = {
  me: async (req, res) => {
    let user = req.user;
    res.status(200).json({
      status: 'SUCCESS',
      message: 'User found',
      data: user,
    });
  },
  getUsers: async (req, res) => {
    // let users = await User.find({}).sort({ createdAt: -1 });
    // console.log(req.query.type);
    // if (!users) {
    //   return res.status(400).json({ message: 'No users found' });
    // }
    // let userCount = await User.countDocuments({});
    // if (req.query.type) {
    //   users = users.filter((user) => user.userType === req.query.type);
    //   userCount = users.length;
    // }
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const users = await features.query;
    const userCount = await User.countDocuments({});
    res.status(200).json({
      status: 'SUCCESS',
      count: users.length,
      data: users,
    });
  },

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      const existedUser = await User.login({ email, password });
      let token = createToken(existedUser._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.status(200).json({
        message: 'Login successful',
        data: existedUser,
        token: token,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      let { username, email, password, userType } = req.body;
      const newUser = await User.register({
        username,
        email,
        password,
        userType,
      });
      let token = createToken(newUser._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({
        message: 'User created successfully',
        user: newUser,
        token: token,
      });
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
  logout:  (req, res) => {
    try {
      res.cookie('jwt', '', { maxAge: 1 });
      return res.status(200).json({
        message: 'Logout successful',
      });
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
};
module.exports = userControllers;
