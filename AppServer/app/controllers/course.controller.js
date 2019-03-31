const Course = require('../models/course.model');

exports.course_create = function (req, res, next) {
    let course = new Course({
        name: req.body.name,
    });
    course.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send(course);
    });
};

exports.course_list = function (req, res, next) {
    Course.find({}, function (err, coursers) {
        if (err) return next(err);
        res.status(200).send(coursers);
    });
};

exports.course_details = function (req, res, next) {
    Course.findById(req.params.id, function (err, course) {
        if (err) return next(err);
        res.status(200).send(course);
    });
};

exports.course_update = function (req, res, next) {
    Course.findByIdAndUpdate(
        req.params.id, { $set: req.body }, { new: true },
        function (err, course) {
            if (err) return next(err);
            res.status(200).send(course);
        }
    );
};

exports.course_delete = function (req, res, next) {
    Course.findByIdAndDelete(req.params.id, function (err) {
        if (err) return next(err);
        res.status(200).send('Course Deleted.');
    });
};