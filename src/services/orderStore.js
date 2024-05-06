const orderStore = {
    state: {
      orders: [],
    },
    getOrders() {
      return this.state.orders;
    },
    addOrder(order) {
      this.state.orders.push(order);
    },
  };
  
  export default orderStore;