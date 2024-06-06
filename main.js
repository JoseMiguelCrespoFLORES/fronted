function showSeats() {
    document.getElementById('seatSelection').style.display = 'block';
    document.getElementById('bookingForm').style.display = 'none';
    
    const seatContainer = document.getElementById('seats');
    seatContainer.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i + 1;
        seat.addEventListener('click', () => seat.classList.toggle('selected'));
        seatContainer.appendChild(seat);
    }
}

function showPayment() {
    document.getElementById('paymentMethod').style.display = 'block';
    document.getElementById('seatSelection').style.display = 'none';
}

function submitBooking() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const seats = Array.from(document.getElementsByClassName('seat selected')).map(seat => seat.textContent);
    const paymentMethod = document.getElementById('payment').value;

    const booking = {
        origin,
        destination,
        date,
        time,
        adults,
        children,
        seats: seats.join(', '),
        paymentMethod
    };

    fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    .then(response => response.json())
    .then(data => {
        alert('Reserva realizada con éxito');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
