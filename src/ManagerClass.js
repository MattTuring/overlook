import Customer from '../src/CustomerClass.js'
class Manager extends Customer {
  constructor() {
    super();
    this.users;
  }

  customerSearch(search) {
    let users = this.users.filter(user => {
      return user.name.toLowerCase().includes(search)
    })
    return users
  }
}

export default Manager;
