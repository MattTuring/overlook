// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Customer from './CustomerClass'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//import './images/hotel.jpeg'

let customer = new Customer()
let userID;

let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => data.bookings)
  .catch(data => console.log('booking data error', data))


let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => data.rooms)
  .catch(data => console.log('room data error', data))


Promise.all([bookingData, roomData]).then((requiredData) => {
  userID = parseInt(localStorage.getItem('userID'))
  customer.booked = requiredData[0];
  customer.rooms = requiredData[1];
  customer.getMyBookings(userID).forEach(room => {$('.bookings').append(`<p class="rooms">Room: ${room.roomNumber} ${room.date}</p>`)})
  $('.spending').html(customer.getTotalSpend(customer.getMyBookings(userID)));
}).catch(data => console.log('Fetch error', data))

$('#future-bookings').hide();

$('#book-date').click(() => {
  if ($('#book-date').val() !== "") {
    $('#future-bookings').toggle()
    let available = customer.bookings($('#book-date').val().replace('-', '/').replace('-', '/'))
    customer.availableToday(available).forEach(room => {$('#upcoming-bookings').append(`<span id="${room.number}" class="upcoming-rooms">Room:${room.number} Beds: ${room.numBeds} ${room.bedSize.toUpperCase()} Price: $${room.costPerNight}</span>`)})
  }
});


$('.select').change(() => {
  $('#upcoming-bookings').html('')
  let available = customer.bookings($('#book-date').val().replace('-', '/').replace('-', '/'))
  customer.availableToday(available, $('.select').val()).forEach(room => {$('#upcoming-bookings').append(`<span id="${room.number}" class="upcoming-rooms">Room:${room.number} Beds: ${room.numBeds} ${room.bedSize.toUpperCase()} Price: $${room.costPerNight}</span>`)})
  if ($('#upcoming-bookings').html() === "") {
    $('#upcoming-bookings').append(`<span>We are very sorry for the inconveince, there are no rooms of this type. Please select another type or date.</span>`)
  }
})

$('#upcoming-bookings').click((event) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      userID: userID,
      date: $('#book-date').val().replace('-', '/').replace('-', '/'),
      roomNumber: parseInt(event.target.id)
    })
  }).catch(error => console.log('There was an error submitting your booking request', error))
  $(event.target).html('SUCCESS!')
})
