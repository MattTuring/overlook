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
$('#future-bookings').hide();


let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => data.bookings)
  .catch(data => console.log('booking data error', data))

let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => data.rooms)
  .catch(data => console.log('room data error', data))

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(data => data.json())
  .then(data => data.users)
  .catch(data => console.log('user data error', data))

Promise.all([bookingData, roomData, userData]).then((requiredData) => {
  manager.booked = requiredData[0];
  manager.rooms = requiredData[1];
  manager.users = requiredData[2];
  let bookedTodayData = manager.bookings(manager.todaysDate());
  $('.date').html(manager.todaysDate());
  $('.revenue').html(manager.getTotalSpend(bookedTodayData));
  $('.percentage').html((bookedTodayData.length/manager.rooms.length) * 100)
  manager.availableToday(bookedTodayData).forEach(room => {$('.available').append(`<button class="rooms">Room:${room.number} Beds: ${room.numBeds} ${room.bedSize.toUpperCase()} Price: $${room.costPerNight}</button>`)})
}).catch(data => console.log('Fetch error', data))

$('#search').keyup(() => {
  let search = $('#search').val()
  $('#search-results').html('')
  manager.customerSearch(search.toLowerCase()).forEach(customer => {
    $('#search-results').append(`<button id="${customer.id}" class="upcoming-rooms">Name: ${customer.name}</button>`)
  })
})

$('#search-results').click(event => {
  $('.bookings').html(`<span data-id="${event.target.id}" class="spending"></span>`)
  if (event.target.id > 0 && event.target.id <= 50) {
    manager.getMyBookings(parseInt(event.target.id)).forEach(room => {$('.bookings').append(`<button class="upcoming-rooms" data-date="${room.date}" data-bookingid="${room.id}">Room: ${room.roomNumber} ${room.date}</button>`)})
    $('.spending').html(`${event.target.innerHTML.split(" ")[1]} ${event.target.innerHTML.split(" ")[2]}: $${manager.getTotalSpend(manager.getMyBookings(parseInt(event.target.id)))}<br>Click to Delete Booking<br>`);
    $('#future-bookings').toggle();
    $('#select-area').hide()
  }
})

$('#submit').click(() => {
  if ($('#book-date').val() !== "") {
    $('#select-area').slideDown()
    let bookings = manager.bookings($('#book-date').val().replace('-', '/').replace('-', '/'))
    $('#upcoming-bookings').html('')
    manager.availableToday(bookings).forEach(room => {
      $('#upcoming-bookings').append(`<button data-room="${room.number}" class="upcoming-rooms">Room:${room.number} Beds: ${room.numBeds} ${room.bedSize.toUpperCase()} Price: $${room.costPerNight}</button>`)
    })
  }
});


$('.select').change(() => {
  $('#upcoming-bookings').html('')
  let bookings = manager.bookings($('#book-date').val().replace('-', '/').replace('-', '/'))
  manager.availableToday(bookings, $('.select').val()).forEach(room => {
    $('#upcoming-bookings').append(`<button id="${room.number}" class="upcoming-rooms">Room:${room.number} Beds: ${room.numBeds} ${room.bedSize.toUpperCase()} Price: $${room.costPerNight}</button>`)
  })
  if ($('#upcoming-bookings').html() === "") {
    $('#upcoming-bookings').append(`<span>We are very sorry for the inconveince, there are no rooms of this type. Please select another type or date.</span>`)
  }
})

$('#upcoming-bookings').click((event) => {
if ($(event.target).hasClass('upcoming-rooms')) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        userID: parseInt($('.spending').data('id')),
        date: $('#book-date').val().replace('-', '/').replace('-', '/'),
        roomNumber: parseInt(event.target.dataset.room)
      })
    }).catch(error => console.log('There was an error submitting your booking request', error))
    $(event.target).html('SUCCESS!')
  }
})

$(".bookings").click(event => {
  if (event.target.dataset.date < manager.todaysDate()) {
    $(event.target).html('Cannot delete bookings from the past.')
    return
  }
  if (event.target.dataset.bookingid > 0) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'delete',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        id: parseInt(event.target.dataset.bookingid)
      })
    }).catch(data => console.log('There was an error deleting the booking', data))
    $(event.target).html('DELETED');
  }
})
