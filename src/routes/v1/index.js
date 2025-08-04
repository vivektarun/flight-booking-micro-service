const express = require('express');

const { InfoController } = require('../../controllers'); // By default from controller index.js is imported.
const bookingRoutes = require('./booking-routes');

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/bookings', bookingRoutes);

module.exports = router;