const axios = require('axios');
const { Enums } = require('../utils/common');
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;
const { BookingRepository } = require('../repositories');
const { ServerConfig } = require('../config/')
const db = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flight/${data.flightId}`);
        const flightData = flight.data.data; // very big data was coming for flight.data from the axios call, from there i retrieve data.
       
        if (data.noOfSeats > flightData.totalSeats) {
            throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
        }

        const totalBillingAmount = data.noOfSeats * flightData.price;

        const bookingPayload = { ...data, totalCost: totalBillingAmount }

        const booking = await bookingRepository.createBooking(bookingPayload, transaction);

        // making this axios call so that, atleast requested number of seats we can block.
        //[TASK] Assure the row lock transaction in flight table.
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flight/${data.flightId}/seats`, {
            seats: data.noOfSeats
        });

        await transaction.commit();
        return booking;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function makePayment(data) {
    const transaction = await db.sequelize.transaction();
    try {
        //Get booking details using booking repository.
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);

        //--------- Write the logic for "how much time should payment making portal should be up" ---------------

        //Check if the booking status is cancelled.
        if(bookingDetails.status == CANCELLED) {
            throw new AppError("The booking has expired", StatusCodes.BAD_REQUEST);
        }

        //Compute the booking time and current time.
        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();

        //Constraint on time.
        if(currentTime - bookingTime > 300000) {
            // [TASK] After canceling the booking bring all the seats back to flight.
            await cancelBooking(data.bookingId);
            throw new AppError("The booking has expired", StatusCodes.BAD_REQUEST);
        }

        //check weather the booking amount is equal to amount paid
        if (bookingDetails.totalCost != data.totalCost) {
            throw new AppError("Amount paid does not match the total cost", StatusCodes.BAD_REQUEST);
        }

        //check weather the user is the same who created the booking.
        if (bookingDetails.userId != data.userId) {
            throw new AppError("User not authorized to make payment", StatusCodes.UNAUTHORIZED);
        }

        // If everything goes well then set the status of booking to "BOOKED".
        const booking = await bookingRepository.update(data.bookingId, {status : BOOKED}, transaction);

        await transaction.commit();
        return booking;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function cancelBooking(bookingId) {
    const transaction = await db.sequelize.transaction();
    try {
        //Get booking details using booking repository.
        const bookingDetails = await bookingRepository.get(bookingId, transaction);

        //Check if the booking status is cancelled.
        if(bookingDetails.status == CANCELLED) {
            await transaction.commit();
            return true;
        }
        //Increase the number of seats.
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flight/${bookingDetails.flightId}/seats`, {
            seats: bookingDetails.noOfSeats,
            dec: 0
        });

        //Change status "CANCELLED"
        await bookingRepository.update(bookingId, {status: CANCELLED}, transaction);
        await transaction.commit();

    } catch(error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    createBooking,
    makePayment,
};