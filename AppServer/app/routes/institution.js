const express = require('express');
const router = express.Router();

const institution_controller = require('../controllers/institution.controller.js');

router.post('/create', institution_controller.institution_create);
router.get('/', institution_controller.institution_list);
// router.get('/:id', institution_controller.institution_details);
router.put('/:id/update', institution_controller.institution_update);
// router.delete('/:id/delete', institution_controller.institution_delete);

module.exports = router;