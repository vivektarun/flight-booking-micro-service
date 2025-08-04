const express = require('express');

const {BookingController} = require('../../controllers');

const router = express.Router();

// Route to create booking.
router.post('/', BookingController.createBooking);

module.exports = router;