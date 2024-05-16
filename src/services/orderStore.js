import { reactive } from "vue";
import order from "../data/order.json";

const currentStorage = JSON.parse(localStorage.getItem("orders"));

const orderStore = {
	state: reactive({
		orders: currentStorage ? currentStorage : order,
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

export default orderStore;