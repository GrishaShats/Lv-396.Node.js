const express = require('express');
const controller = require('../controllers/UserController');

const router = express.Router();

router.route('/')
  .get(controller.getAll)
  .delete(controller.deleteOne)
  .put(controller.updateOne);

router.get('/:id', controller.getOne);


module.exports = router;
