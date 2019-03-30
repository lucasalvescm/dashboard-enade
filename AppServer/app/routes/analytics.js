const express = require('express');
const router = express.Router();

const analytics_controller = require('../controllers/analytics.controller.js');

router.get('/filter_institutions', analytics_controller.filter_institutions);

module.exports = router;