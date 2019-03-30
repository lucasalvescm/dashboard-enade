const Institution = require('../models/institution.model');


exports.filter_institutions = function (req, res, next) {
  var query = Institution.find({}).select({ "name": 1, "generalNote": 1 });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};