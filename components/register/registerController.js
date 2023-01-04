
const createError = require('http-errors');
const qs = require('qs');

exports.register = async (req, res) => {
  res.render('register/page')
};
