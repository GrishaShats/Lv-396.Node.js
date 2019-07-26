const express = require('express');
const usersRouter = require('./users.route');
const authRouter = require('./auth.route');
const issuesRouter = require('./issues.route');
const passport = require('../../../config/passport');

const router = express.Router();

router.use('/users', passport.authenticate('jwt', {
  session: false,
}), usersRouter);

router.use('/auth', authRouter);

router.use('/issues', passport.authenticate('jwt', {
  session: false,
}), issuesRouter);

module.exports = router;
