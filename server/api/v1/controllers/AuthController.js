const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../../../models/user.model');
const {
  JWT_SECRET,
} = require('../../../config/config');

const signin = async (req, res) => {
  const {
    login,
    password,
  } = req.body;
  try {
    const user = await User.findOne({ login }).exec();

    if (!user) {
      res.status(404).json({
        err: 'User not found',
      });
      return 0;
    }

    if (user.checkPassword(password)) {
      res.json({
        token: jwt.sign({
          id: user._id,
        }, JWT_SECRET, {}),
      });
      return 0;
    }

    res.status(400).json({
      err: 'passwords don\'t match',
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const signup = async (req, res) => {
  const newUser = User({
    name: req.body.name,
    login: req.body.login,
    password: req.body.password,
    city: req.body.city,
    contact: req.body.contact,
  });

  if (!newUser.password) {
    parameters.password = crypto.randomBytes(4).toString('hex');
  }

  try {
    await newUser.save();
    res.status(201).json({
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};


module.exports = {
  signin,
  signup,
};
