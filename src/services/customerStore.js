import customerData from '../data/customers.json';

const customerStore = {
  state: {
    customers: JSON.parse(customerData).data,
  },
  getCustomers() {
    return this.state.customers;
  },
  addCustomer(customer) {
    this.state.customers.push(customer);
  },
  removeCustomer(customer) {
    const index = this.state.customers.indexOf(customer);
    this.state.customers.splice(index, 1);
  },
  updateCustomer(customer) {
    const index = this.state.customers.indexOf(customer);
    this.state.customers.splice(index, 1, customer);
  },
};

export default customerStore;