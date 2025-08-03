const express = require('express');

const { InfoController } = require('../../controllers'); // By default from controller index.js is imported.

const router = express.Router();

router.get('/info', InfoController.info);

module.exports = router;