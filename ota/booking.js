document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const flightId = urlParams.get('flightId');
    const airline = urlParams.get('airline');
    const departure = urlParams.get('departure');
    const arrival = urlParams.get('arrival');
    const price = urlParams.get('price');

    document.getElementById('flight-id').value = flightId;
    document.getElementById('airline').value = airline;
    document.getElementById('departure').value = departure;
    document.getElementById('arrival').value = arrival;
    document.getElementById('price').value = price;

    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Booking submitted successfully!');
        // Implement the booking submission logic here
    });
});