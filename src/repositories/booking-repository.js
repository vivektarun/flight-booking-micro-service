const { Booking } = require('../models');
const { Enums } = require('../utils/common');
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;
const { Op } = require("sequelize");
const CrudRepository = require('./crud-repository');
const {StatusCodes} = require("http-status-codes");

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) {
        const response = await Booking.create(data, { transaction: transaction });
        return response;
    }

    //Override get function
    async get(data, transaction) {
        const response = await Booking.findByPk(data, { transaction: transaction });
        if (!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    //Override update function
    async update(id, data, transaction) {
        const response = await Booking.update(data, {
            where: {id : id},
            transaction : transaction
        });
            
        return response;
    }

    //Use for Cron jobs.
    async cancelOldBooking(timestamp) {
        const response = await Booking.update({status: CANCELLED}, {
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }
                    },
                    {
                        status: {
                            [Op.ne]: BOOKED
                        }
                    },
                    {
                        status: {
                            [Op.ne]:CANCELLED
                        }
                    }
                ]
            }
        })
        return response;
    }
}

module.exports = BookingRepository;