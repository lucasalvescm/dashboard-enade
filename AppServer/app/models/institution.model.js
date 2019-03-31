const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InstitutionSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    generalNote: { type: Number, required: true, max: 100 },
    coursers: [{
        name: { type: String, required: true, max: 100 },
        note: { type: Number, required: true, max: 100 },
        averageStudentNote: { type: Number, required: true, max: 100 }
    }]
});

module.exports = mongoose.model('Institution', InstitutionSchema);