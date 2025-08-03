/**
 * Validates that the departure time is earlier than the arrival time.
 * @param {string} departureTime - The departure time in ISO string format.
 * @param {string} arrivalTime - The arrival time in ISO string format.
 * @throws {Error} Throws an error if validation fails.
 */
function validateDateTime(departureTime, arrivalTime) {
    const departure = new Date(departureTime).getTime();
    const arrival = new Date(arrivalTime).getTime();

    if (isNaN(departure) || isNaN(arrival)) {
        throw new Error('Invalid date format. Use ISO 8601 format.');
    }

    if (departure >= arrival) {
        throw new Error('Departure time must be earlier than arrival time.');
    }
}

module.exports = {
    validateDateTime,
};
