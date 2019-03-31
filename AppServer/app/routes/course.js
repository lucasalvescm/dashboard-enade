const express = require('express');
const router = express.Router();

const course_controller = require('../controllers/course.controller.js');

router.post('/create', course_controller.course_create);
router.get('/', course_controller.course_list);
router.get('/:id', course_controller.course_details);
router.put('/:id/update', course_controller.course_update);
router.delete('/:id/delete', course_controller.course_delete);

module.exports = router;