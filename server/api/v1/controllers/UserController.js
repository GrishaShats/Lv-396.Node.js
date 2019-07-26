const User = require('../../../models/user.model');

const getAll = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findByIdAndDelete(id).exec();
    if (!user) {
      res.status(404).json({
        err: 'User not found',
      });
      return 0;
    }
    res.json({
      deleted: user,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.body;
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    login: req.body.login,
  };

  try {
    const user = await User.findByIdAndUpdate(id, newUser, { new: true })
      .exec();
    if (!user) {
      res.status(404).json({
        err: 'User not found',
      });
      return 0;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .exec();

    if (!user) {
      res.status(404).json({
        err: 'User not found',
      });
      return 0;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

module.exports = {
  getAll,
  deleteOne,
  updateOne,
  getOne,
};
