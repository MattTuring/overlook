// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Manager from './ManagerClass'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//import './images/hotel.jpeg'

//date
let manager = new Manager();

$('.date').html(manager.todaysDate());

let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => data.bookings)


let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => data.rooms)

Promise.all([bookingData, roomData]).then((requiredData) => {
  manager.rooms = requiredData[1];
  manager.booked = requiredData[0];
  let bookedTodayData = manager.bookings(manager.booked);
  $('.revenue').html(manager.totalSpend(manager.rooms, bookedTodayData).toFixed(2));
  $('.percentage').html((bookedTodayData.length/manager.rooms.length) * 100)
  manager.availableToday(manager.rooms, bookedTodayData).forEach(room => {$('.available').append(`<span class="rooms">Room:${room.number} Beds: ${room.numBeds} ${room.bedSize.toUpperCase()} Price: $${room.costPerNight}</span>`)})
}).catch(data => console.log('Fetch error', data))
