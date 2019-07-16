const User = require('../../../models/user.model');

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
    name: req.body.name,
    login: req.body.login,
    city: req.body.city,
    contact: req.body.contact,
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
  deleteOne,
  updateOne,
  getOne,
};
