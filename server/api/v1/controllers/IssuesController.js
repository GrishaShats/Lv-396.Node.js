const Issues = require('../../../models/issue.model');
const url = require('url');

const getOneByQuery = async (req, res) => {
  try {
    const { query } = url.parse(req.url, true);
    const { userId } = query;
    const issues = await Issues.find({
      $or:
        [
          { author: userId },
          { sharedTo: userId }
        ],
    })
      .populate('author', ['firstName', 'lastName'])
      .populate('sharedTo', ['firstName', 'lastName'])
      .populate('sharedFrom', ['firstName', 'lastName'])
      .exec();
    if (!userId) {
      res.status(404).json({
        err: 'Issue not found',
      });
    }
    res.json(issues);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const createOne = async (req, res) => {
  const newIssue = Issues({
    name: req.body.name,
    author: req.body.author,
  });
  try {
    await newIssue.save();
    res.status(201).json({
      id: newIssue._id,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.body;
  let newIssue;
  if (req.body.name)
    newIssue = { name: req.body.name};
  else if (req.body.sharedTo && req.body.sharedFrom)
    newIssue = {
      sharedTo: req.body.sharedTo,
      sharedFrom: req.body.sharedFrom,
    };
  else if (!req.body.name || req.body.sharedTo || req.body.sharedFrom)
    res.json({
      err: 'You should enter new name or sharedTo and sharedFrom options',
    });
  try {
    const issue = await Issues.findByIdAndUpdate(id, newIssue, { new: true })
      .exec();
    if (!issue) {
      res.status(404).json({
        err: 'Issue not found',
      });
      return 0;
    }
    res.status(200).json({
      updated: 'Successfully',
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.body;
  try {
    const issue = await Issues.findByIdAndDelete(id).exec();
    if (!issue) {
      res.status(404).json({
        err: 'Issue not found',
      });
      return 0;
    }
    res.json({
      deleted: 'Successfully',
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

module.exports = {
  getOneByQuery,
  createOne,
  updateOne,
  deleteOne,
};
