import paymentData from "../data/payment.json";

const paymentStore = {
	state: {
		payments: paymentData,
	},
	getPayments() {
		return this.state.payments;
	},
	addPayment(payment) {
		this.state.payments.push(payment);
	},
	removePayment(payment) {
		const index = this.state.payments.indexOf(payment);
		this.state.payments.splice(index, 1);
	},
	updatePayment(payment) {
		const index = this.state.payments.indexOf(payment);
		this.state.payments.splice(index, 1, payment);
	},
};

export default paymentStore;
