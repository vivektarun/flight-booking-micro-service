const express = require('express');

const {BookingController} = require('../../controllers');

const router = express.Router();

// Route to create booking.
router.post('/', BookingController.createBooking);
// Route to make booking.
router.post('/payments', BookingController.makePayment);

module.exports = router;