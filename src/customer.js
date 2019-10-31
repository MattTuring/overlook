// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//import './images/hotel.jpeg'
let userID = parseInt(localStorage.getItem('userID'))


let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => data.bookings)


let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => data.rooms)


  function myBookings(booked) {
    let result = booked.filter(booking => {
      return booking.userID === userID
    })
    return result.sort((a,b) => new Date(a.date) - new Date(b.date))
  }
//
// I should see a dashboard page that shows me:
// Any room bookings I have made (past or present/upcoming)
// The total amount I have spent on rooms
Promise.all([bookingData, roomData]).then((requiredData) => {
  const rooms = requiredData[1];
  const booked = requiredData[0];
  myBookings(booked).forEach(room => { console.log(room), $('.bookings').append(`<span class="rooms">${room.roomNumber}, ${room.date}</span>`)})
}).catch(data => console.log('Fetch error', data))
