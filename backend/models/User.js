const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

UserSchema.statics.register = async function ({
  username,
  email,
  password,
  userType,
}) {
  let userCheck = await this.findOne({ email });
  if (userCheck) {
    throw new Error('User already exists');
  }
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await this.create({
    username,
    email,
    password: hashedPassword,
    userType,
  });
  return newUser;
};

UserSchema.statics.login = async function ({ email, password }) {
  let user = await this.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  return user;
};
module.exports = mongoose.model('User', UserSchema);
