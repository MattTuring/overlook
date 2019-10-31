// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//import './images/hotel.jpeg'
let userID;


//login functions
$('#submit').click(event => {
  event.preventDefault();

  if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2019') {
    window.location = './manager.html'
  }

  if ($('#username').val().includes('customer')) {
    userID = parseInt($('#username').val().split('r')[1]);
    localStorage.setItem('userID', userID);
  }

  if ($('#username').val().includes('customer') && $('#password').val() === 'overlook2019' && userID > 0 && userID <= 50) {
    window.location = './customer.html'
  }
})
