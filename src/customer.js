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

let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => data.bookings)
  .catch(data => console.log('booking data error', data))


let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => data.rooms)
  .catch(data => console.log('room data error', data))


Promise.all([bookingData, roomData]).then((requiredData) => {
  let userID = parseInt(localStorage.getItem('userID'))
  const rooms = requiredData[1];
  const booked = requiredData[0];
  customer.myBookings(booked, userID).forEach(room => {$('.bookings').append(`<p class="rooms">Room: ${room.roomNumber} ${room.date}</p>`)})
  $('.spending').html(customer.totalSpend(rooms, customer.myBookings(booked, userID)))
}).catch(data => console.log('Fetch error', data))
