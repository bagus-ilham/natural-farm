import { reactive } from "vue";

const orderStore = {
  state: reactive({
    orders: JSON.parse(localStorage.getItem("orders") || "[]"),
  }),

  getOrders() {
    return this.state.orders;
  },

  addOrder(order) {
    this.state.orders.push(order);
    this.saveOrdersToLocalStorage();
  },

  deleteOrder(id) {
    const index = this.state.orders.findIndex((order) => order.id === id);
    if (index !== -1) {
      this.state.orders.splice(index, 1);
      this.saveOrdersToLocalStorage();
    }
  },

  saveOrdersToLocalStorage() {
    localStorage.setItem("orders", JSON.stringify(this.state.orders));
  },
};

export default orderStore;