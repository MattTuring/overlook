const chai = require('chai');
const expect = chai.expect;

import bookingData from './bookingData-test.js';
import roomData from './roomData-test.js';

import Customer from '../src/CustomerClass.js';



describe('Customer Class', () => {

  let customer;
  beforeEach(() => {
    customer = new Customer()
    customer.rooms = roomData.rooms;
    customer.booked = bookingData.bookings;
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should return total bookings of a one customer', () => {
    expect(customer.getMyBookings(1)).to.deep.equal([ { id: 1572293130178,
    userID: 1,
    date: '2019/12/10',
    roomNumber: 2,
    roomServiceCharges: [] },
  { id: 1572293130178,
    userID: 1,
    date: '2019/12/11',
    roomNumber: 19,
    roomServiceCharges: [] } ]
)
  });

  it('should return total spending on an individual customer', () => {
    expect(customer.getTotalSpend(customer.getMyBookings(1))).to.equal('852.05');
  });

  it('should return all avalible bookings by date', () => {
    expect(customer.availableToday(customer.bookings("2019/11/06"))).to.deep.equal([ { number: 1,
    roomType: 'residential suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 358.4 },
  { number: 2,
    roomType: 'suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 477.38 },
  { number: 3,
    roomType: 'single room',
    bidet: false,
    bedSize: 'king',
    numBeds: 1,
    costPerNight: 491.14 },
  { number: 4,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 429.44 },
  { number: 5,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 340.17 },
  { number: 6,
    roomType: 'junior suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 397.02 },
  { number: 8,
    roomType: 'junior suite',
    bidet: false,
    bedSize: 'king',
    numBeds: 1,
    costPerNight: 261.26 },
  { number: 9,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 200.39 },
  { number: 10,
    roomType: 'suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 1,
    costPerNight: 497.64 },
  { number: 11,
    roomType: 'single room',
    bidet: true,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 207.24 },
  { number: 12,
    roomType: 'single room',
    bidet: false,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 172.09 },
  { number: 14,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 1,
    costPerNight: 457.88 },
  { number: 15,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 1,
    costPerNight: 294.56 },
  { number: 16,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 325.6 },
  { number: 17,
    roomType: 'junior suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 328.15 },
  { number: 19,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 374.67 },
  { number: 20,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 343.95 },
  { number: 21,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 429.32 },
  { number: 22,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 350.31 },
  { number: 23,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 176.36 },
  { number: 24,
    roomType: 'suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 327.24 },
  { number: 25,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 305.85 } ]
)
})

it('should return avalible bookings by residential suite', () => {
    expect(customer.availableToday(customer.bookings("2019/11/06"), 'residential suite')).to.deep.equal([ { number: 1,
    roomType: 'residential suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 358.4 },
  { number: 14,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 1,
    costPerNight: 457.88 },
  { number: 15,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 1,
    costPerNight: 294.56 },
  { number: 20,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 343.95 },
  { number: 23,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 176.36 } ]
)
})
it('should return avalible bookings by suite', () => {
    expect(customer.availableToday(customer.bookings("2019/11/06"), 'suite')).to.deep.equal([ { number: 2,
    roomType: 'suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 477.38 },
  { number: 10,
    roomType: 'suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 1,
    costPerNight: 497.64 },
  { number: 24,
    roomType: 'suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 327.24 } ]
)
})

it('should return avalible bookings by junior suite', () => {
    expect(customer.availableToday(customer.bookings("2019/11/06"), 'junior suite')).to.deep.equal( [{ number: 6,
    roomType: 'junior suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 397.02 },
  { number: 8,
    roomType: 'junior suite',
    bidet: false,
    bedSize: 'king',
    numBeds: 1,
    costPerNight: 261.26 },
  { number: 17,
    roomType: 'junior suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 328.15 } ])
  })

it('should return avalible bookings by single room', () => {
    expect(customer.availableToday(customer.bookings("2019/11/06"), 'single room')).to.deep.equal([ { number: 3,
    roomType: 'single room',
    bidet: false,
    bedSize: 'king',
    numBeds: 1,
    costPerNight: 491.14 },
  { number: 4,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 429.44 },
  { number: 5,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 340.17 },
  { number: 9,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 200.39 },
  { number: 11,
    roomType: 'single room',
    bidet: true,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 207.24 },
  { number: 12,
    roomType: 'single room',
    bidet: false,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 172.09 },
  { number: 16,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 325.6 },
  { number: 19,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 374.67 },
  { number: 21,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 429.32 },
  { number: 22,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 350.31 },
  { number: 25,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 305.85 } ]
)
});


  it('should return todays date', () => {
    //there needs to be a better way to test this
    expect(customer.todaysDate()).to.equal('2019/11/03');
  });

  it('should bookings for specific date', () => {
    expect(customer.bookings("2019/11/06")).to.eql( [
        {
          "date": "2019/11/06",
          "id": 1572293130156,
          "roomNumber": 18,
          "roomServiceCharges": [],
          "userID": 19
        },
        {
        "date": "2019/11/06",
          "id": 1572293130160,
          "roomNumber": 7,
          "roomServiceCharges": [],
          "userID": 16
        },
        {
          "date": "2019/11/06",
          "id": 1572293130179,
          "roomNumber": 13,
          "roomServiceCharges": [],
          "userID": 21
        }
    ])
  })
})
