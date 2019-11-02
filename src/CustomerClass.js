class Customer {
  constructor(booked, rooms) {
    this.rooms = rooms;
    this.booked = booked;
  }

  getTotalSpend(bookings) {
    let spend = bookings.reduce((acc, booking) => {
      this.rooms.forEach(room => {
        if (room.number === parseInt(booking.roomNumber)) {
          acc += room.costPerNight
        }
      })
      return acc
    }, 0)
    return spend.toFixed(2)
  }

  getMyBookings(userID) {
    let result = this.booked.filter(booking => {
      return booking.userID === userID
    })
    return result.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  availableToday(bookings, type) {

    let roomNumber = this.rooms.map(room => {
      return room.number;
    })
    bookings.forEach(booking => {
      roomNumber.splice(roomNumber.indexOf(parseInt(booking.roomNumber)), 1)
    })
    let roomDetials = roomNumber.reduce((acc,number) => {
      let details = this.rooms.filter(room => {
        return number === room.number
      })
      acc.push(details[0]);
      return acc
    }, [])
    if (!type || type === 'all') {
      return roomDetials;
    }
    return roomDetials.filter(room => {
      return room.roomType === type
    })
  }



  todaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    return today;
  }

  bookings(date) {
    let result = this.booked.filter(room => {
      return room.date === date
    })
    return result
  }
}
export default Customer;
