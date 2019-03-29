const Institution = require('../models/institution.model');

exports.institution_create = function (req, res, next) {
    let institution = new Institution({
        name: req.body.name,
        generalNote: req.body.generalNote,
        coursers: req.body.coursers
    });
    institution.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send(institution);
    });
};

exports.institution_list = function (req, res, next) {
    Institution.find({}, function (err, institution) {
        if (err) return next(err);
        res.status(200).send(institution);
    }).sort({ name: 1 });
};

// exports.institution_details = function(req, res, next) {
//     institution.findById(req.params.id, function(err, institution) {
//         if (err) return next(err);
//         res.status(200).send(institution);
//     });
// };

exports.institution_update = function (req, res, next) {
    Institution.findByIdAndUpdate(
        req.params.id, { $set: req.body }, { new: true },
        function (err, institution) {
            if (err) return next(err);
            res.status(200).send(institution);
        }
    );
};

exports.institution_delete = function (req, res, next) {
    Institution.findByIdAndDelete(req.params.id, function (err) {
        if (err) return next(err);
        res.status(200).send('Institution Deleted.');
    });
};