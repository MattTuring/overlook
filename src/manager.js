// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//import './images/hotel.jpeg'

//date
function todaysDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  return today;
}

$('.date').html(todaysDate());

function bookedToday(data) {
  let result = data.filter(room => {
    return room.date === todaysDate();
  })
  return result
}

function availableToday(rooms, booked) {
  let roomNumber = rooms.map(room => {
    return room.number;
  })
  booked.forEach(booking => {
    roomNumber.splice(roomNumber.indexOf(booking.roomNumber), 1)
  })
  return roomNumber
}

let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => data.bookings)


let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => data.rooms)

function revenue(rooms, booked) {
  let rev = booked.reduce((acc, booking) => {
    rooms.forEach(room => {
      if (room.number === booking.roomNumber) {
        acc += room.costPerNight;
      }
    })
    return acc
  }, 0)
  return rev
}

Promise.all([bookingData, roomData]).then((requiredData) => {
  const rooms = requiredData[1];
  const booked = requiredData[0];
  let bookedTodayData = bookedToday(booked);
  $('.revenue').html(revenue(rooms, bookedTodayData).toFixed(2));
  $('.percentage').html((bookedTodayData.length/rooms.length) * 100)
  availableToday(rooms, bookedTodayData).forEach(room => {$('.available').append(`<span class="rooms">${room}</span>`)})
}).catch(data => console.log('Fetch error', data))
