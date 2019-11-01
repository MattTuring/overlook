import Customer from '../src/CustomerClass.js'
class Manager extends Customer {
  constructor() {
    super();
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

export default Manager;
