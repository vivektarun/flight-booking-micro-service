const { Booking } = require('../models');
const CrudRepository = require('./crud-repository');
const {StatusCodes} = require("http-status-codes");

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

}

module.exports = BookingRepository;