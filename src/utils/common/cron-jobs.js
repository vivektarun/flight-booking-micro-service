const cron = require('node-cron');

const { BookingService } = require('../../services');

function scheduleCrons() {
    cron.schedule('*/20 * * * *', async () => { //Run after every 20 minute.
        const response = await BookingService.cancelOldBookings();
        return response;
    })
}

module.exports = scheduleCrons;