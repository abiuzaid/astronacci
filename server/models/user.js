const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  membershipType: {
    type: String,
    enum: ['A', 'B', 'C'],
    default: 'A',
  },
}, {
  timestamps: true,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, membershipType: this.membershipType }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
