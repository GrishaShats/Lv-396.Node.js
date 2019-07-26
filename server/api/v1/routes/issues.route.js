const express = require('express');
const controller = require('../controllers/IssuesController');

const router = express.Router();

router.route('/')
  .get(controller.getOneByQuery)
  .post(controller.createOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;
