const chai = require('chai');
const expect = chai.expect;

import bookingData from './bookingData-test.js';
import roomData from './roomData-test.js';
import userData from './userData-test.js'

import Manager from '../src/ManagerClass.js';



describe('Manager Class', () => {

  let manager;
  beforeEach(() => {
    manager = new Manager()
    manager.rooms = roomData.rooms;
    manager.booked = bookingData.bookings;
    manager.users = userData.users;
  })

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should matching users', () => {

    expect(manager.customerSearch('an')).to.deep.eql([
      { id: 5, name: 'Rhiannon Little' },
      { id: 8, name: 'Era Hand' } ]
    )
  });
})
