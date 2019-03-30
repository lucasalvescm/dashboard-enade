const express = require('express');
const router = express.Router();

const analytics_controller = require('../controllers/analytics.controller.js');

router.get('/filter_institutions', analytics_controller.filter_institutions);
router.get('/filter_coursers_in_institutions/:courseName/:orderBy/', analytics_controller.filter_coursers_in_institutions);
router.get('/filters_headers', analytics_controller.filters_headers);

module.exports = router;