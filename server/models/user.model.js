const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {
  Schema,
} = mongoose;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  }
});

function hashPassword(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err);
    }
    this.password = hash;
    next();
  });
  return 1;
}

UserSchema.pre('save', hashPassword);

function checkPassword(passwordToCheck) {
  return bcrypt.compareSync(passwordToCheck, this.password);
}

UserSchema.methods.checkPassword = checkPassword;

UserSchema.set('toObject', {
  transform(doc, ret) {
    const object = ret;
    delete object.__v;
    return object;
  },
});

UserSchema.set('toJSON', {
  transform(doc, ret) {
    const object = ret;
    delete object.__v;
    return object;
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
