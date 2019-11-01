class Customer {
  constructor() {
    this.rooms;
    this.booked;
  }

  totalSpend(rooms, booked) {
    let spend = booked.reduce((acc, booking) => {
      rooms.forEach(room => {
        if (room.number === parseInt(booking.roomNumber)) {
          acc += room.costPerNight
        }
      })
      return acc
    }, 0)
    return spend.toFixed(2)
  }

  myBookings(booked, userID) {
    let result = booked.filter(booking => {
      return booking.userID === userID
    })
    return result.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  availableToday(rooms, booked, type) {
    let roomNumber = rooms.map(room => {
      return room.number;
    })
    booked.forEach(booking => {
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

  bookings(data, date) {
    let result = data.filter(room => {
      if (!date) {
        return room.date === this.todaysDate();
      }
      return room.date === date

    })
    return result
  }
}
export default Customer;
