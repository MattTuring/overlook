class Customer {
  constructor() {

  }

  totalSpend(rooms, booked) {
    let spend = booked.reduce((acc, booking) => {
      rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          acc += room.costPerNight
        }
      })
      return acc
    }, 0)
    return spend
  }

  myBookings(booked, userID) {
    let result = booked.filter(booking => {
      return booking.userID === userID
    })
    return result.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  availableToday(rooms, booked) {
    let roomNumber = rooms.map(room => {
      return room.number;
    })
    booked.forEach(booking => {
      roomNumber.splice(roomNumber.indexOf(booking.roomNumber), 1)
    })
    return roomNumber
  }

  todaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    return today;
  }

  booked(data, date) {
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
