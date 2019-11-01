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
}
export default Customer;
