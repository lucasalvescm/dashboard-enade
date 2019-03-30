const Institution = require('../models/institution.model');


exports.filter_institutions = function (req, res, next) {
  var query = Institution.find({}).select({ "name": 1, "generalNote": 1 });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.filter_coursers_in_institutions = function (req, res, next) {
  var query = Institution.find(
    { "coursers.name": req.params.courseName }
  ).select({ "name": 1, "coursers.name": 1, "coursers.note": 1 });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};