document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    
    console.log('Form submitted with:', { origin, destination, date });
    authenticateAndFetchFlights(origin, destination, date);
});

const airlineNames = {
    'QR': 'Qatar Airways',
    'SV': 'Saudia',
    'BG': 'Biman Bangladesh Airlines',
    'EK': 'Emirates'
    // Add more airline codes and names as needed
};

function authenticateAndFetchFlights(origin, destination, date) {
    const apiKey = 'ebGRBXoTiv6Xqc9syywti8ohD0IQzI4O';
    const apiSecret = 'wnU8nO7BA7jRukx5';
    const authUrl = 'https://api.amadeus.com/v1/security/oauth2/token';
    
    fetch(authUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Authentication failed: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Authentication successful:', data);
        const accessToken = data.access_token;
        fetchFlights(origin, destination, date, accessToken);
    })
    .catch(error => {
        console.error('Error during authentication:', error);
        document.getElementById('results').innerHTML = '<p>Error during authentication. Please try again later.</p>';
    });
}

function fetchFlights(origin, destination, date, accessToken) {
    const apiUrl = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1`;
    
    console.log('Fetching flights from API:', apiUrl);
    
    fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        console.log('API response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Flight data received:', data);
        displayResults(data);
    })
    .catch(error => {
        console.error('Error fetching flight data:', error);
        document.getElementById('results').innerHTML = `<p>Error fetching flight data: ${error.message}. Please try again later.</p>`;
    });
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.data && data.data.length > 0) {
        data.data.forEach(flight => {
            const airlineCode = flight.itineraries[0].segments[0].carrierCode;
            const airlineName = airlineNames[airlineCode] || airlineCode;
            const flightElement = document.createElement('div');
            flightElement.classList.add('flight-result');
            flightElement.innerHTML = `
                <p>Flight: ${flight.id}</p>
                <p>Airline: ${airlineName}</p>
                <p>Departure: ${flight.itineraries[0].segments[0].departure.at}</p>
                <p>Arrival: ${flight.itineraries[0].segments[0].arrival.at}</p>
                <p>Price: $${flight.price.total}</p>
                <button class="book-now" onclick="bookFlight('${flight.id}', '${airlineName}', '${flight.itineraries[0].segments[0].departure.at}', '${flight.itineraries[0].segments[0].arrival.at}', '${flight.price.total}')">Book Now</button>
            `;
            resultsDiv.appendChild(flightElement);
        });
    } else {
        resultsDiv.innerHTML = '<p>No flights found.</p>';
    }
}

function bookFlight(flightId, airline, departure, arrival, price) {
    const bookingUrl = `booking.html?flightId=${flightId}&airline=${airline}&departure=${departure}&arrival=${arrival}&price=${price}`;
    console.log('Redirecting to:', bookingUrl); // Add this line for debugging
    window.location.href = bookingUrl;
}