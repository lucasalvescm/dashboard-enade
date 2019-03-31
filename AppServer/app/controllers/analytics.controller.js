const Institution = require('../models/institution.model');
const Course = require('../models/course.model');


exports.filter_institutions = function (req, res, next) {
  var query = Institution.find({}).select({ "name": 1, "generalNote": 1, "coursers": 1 }).sort({ "generalNote": -1 });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.filter_coursers_in_institutions = function (req, res, next) {
  let order = "coursers." + req.params.orderBy
  var query = Institution.find(
    { "coursers.name": req.params.courseName }
  ).select({ "name": 1, "coursers.name": 1, "coursers.note": 1, "coursers.averageStudentNote": 1 }).sort({ [order]: - 1 });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.filters_headers = function (req, res, next) {
  Institution.find({}, function (err, result) {
    if (!err) {
      total_inst = 0
      higher_note = { name: "", note: 0 }
      higher_note_alumns = { course: "", note: 0, instituition: "" }
      for (idx in result) {
        total_inst += 1
        if (higher_note.note < result[idx].generalNote) {
          higher_note = {
            name: result[idx].name,
            note: result[idx].generalNote,
          }
        }
        result[idx].coursers.map((course, v) => {
          if (course.averageStudentNote > higher_note_alumns.note) {
            higher_note_alumns = {
              course: course.name,
              note: course.averageStudentNote,
              instituition: result[idx].name
            }
          }
        })
      }

      response = {
        total_inst: total_inst,
        higher_note: higher_note,
        higher_note_alumns: higher_note_alumns,
      }
      res.send(response);
    } else { throw err; }
  });
};
