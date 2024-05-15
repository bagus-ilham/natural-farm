<template>
	<div class="container mx-auto px-5 py-10">
	  <div class="bg-white shadow-md rounded-md p-5 h-full w-full">
		<span class="text-2xl font-bold mb-10">Add Checkout</span>
		<form @submit.prevent="onSubmit" class="mt-10">
		  <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
			<div>
			  <div>
				<label for="customer" class="block font-medium mb-2">Customer</label>
				<v-autocomplete
				  id="customer"
				  label="Customer"
				  items="customers"
				  item-title="customer_name"
				  item-value="customers"
				  variant="outlined"
				  return-object
				  v-model="checkoutData.customer"
				  class="mb-4"
				></v-autocomplete>
			  </div>
			  <div>
				<label for="payment" class="block font-medium mb-2">Payment</label>
				<v-autocomplete
				  id="payment"
				  label="Payment"
				  items="payments"
				  item-title="name"
				  item-value="payments"
				  variant="outlined"
				  return-object
				  v-model="checkoutData.payment"
				  class="mb-4"
				></v-autocomplete>
			  </div>
			  <div class="mt-10">
				<p class="text-2xl font-bold mb-5">Detail Order</p>
				<p class="text-lg mb-2">{{ checkoutData.customer.customer_name }}</p>
				<p class="text-base text-right">{{ checkoutData.payment.name }}</p>
				<div class="mt-5">
				  <p class="text-base font-medium">Product Order</p>
				  <ul class="list-disc list-inside mx-5">
					<li v-for="(item, index) in checkoutData.products" :key="index" class="mb-4">
					  <p>{{ item.name }}</p>
					  <p>Qty: {{ item.quantity }}</p>
					  <p>Price: {{ formatCurrency(item.price) }}</p>
					  <p>
						Discount: {{ formatCurrency(calculateDiscountPrice(item.price, item.discount)) }}
						({{ item.discount }}%)
					  </p>
					  <p>Total: {{ formatCurrency(calculateTotal(item.quantity, item.price)) }}</p>
					</li>
				  </ul>
				</div>
			  </div>
			</div>
  
			<div>
			  <p class="text-lg font-bold pb-5">
				Products
				<button
				  type="button"
				  class="ml-5 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
				  @click="addProduct"
				>
				  <svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 mr-2"
					viewBox="0 0 20 20"
					fill="currentColor"
				  >
					<path
					  fill-rule="evenodd"
					  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
					  clip-rule="evenodd"
					/>
				  </svg>
				  Add Product
				</button>
			  </p>
  
			  <div class="border border-gray-300 rounded-md min-h-48 flex flex-wrap p-4">
				<checkout-product-item
				  v-for="(product, index) in checkoutData.products"
				  :key="index"
				  :product="product"
				  :products="products"
				  @change="updateProduct"
				  @delete="deleteProduct"
				  class="w-full"
				/>
			  </div>
			</div>
		  </div>
		  <div class="mt-10 flex justify-end">
			<button
			  type="submit"
			  :disabled="checkoutData.products.length === 0"
			  :loading="loading"
			  class="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 disabled:opacity-50"
			>
			  Save
			</button>
		  </div>
		</form>
	  </div>
	</div>
  </template>

<script>
import { v4 as uuidv4 } from "uuid";
import customerStore from "../services/customerStore.js";
import paymentStore from "../services/paymentStore";
import productStore from "../services/productStore";
import utilsStore from "../services/utilsStore";
import orderStore from "../services/orderStore";

export default {
	data() {
		return {
			loading: false,
			customers: customerStore.getCustomers(),
			payments: paymentStore.getPayments(),
			products: productStore.state.products,
			checkoutData: {
				customer: { customer_name: "" },
				payment: { name: "" },
				products: [],
				additionalDiscount: 0,
				totalPrice: 0,
				totalDiscount: 0,
			},
		};
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			try {
				// No need to fetch data as it's already fetched from stores
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		},
		updateProduct(product) {
			const index = this.checkoutData.products.findIndex((p) => p.id === product.id);
			this.checkoutData.products.splice(index, 1, product);
		},
		deleteProduct(product) {
			const index = this.checkoutData.products.findIndex((p) => p.id === product.id);
			this.checkoutData.products.splice(index, 1);
		},
		addProduct() {
			this.checkoutData.products.push({
				id: uuidv4(),
				name: "",
				price: 0,
				discount: 0,
				quantity: 1,
			});
		},
		calculateDiscountPrice(price, discount) {
			return (this.checkoutData.totalDiscount = (price * discount) / 100);
		},
		formatCurrency(amount) {
			const formatter = new Intl.NumberFormat("id-ID", {
				style: "currency",
				currency: "IDR",
			});

			return formatter.format(amount);
		},
		calculateTotal(qty, price) {
			return (this.checkoutData.totalPrice = qty * price - this.checkoutData.totalDiscount);
		},
		onSubmit() {
			this.loading = true;
			utilsStore.showSnackbar();
			setTimeout(() => {
				orderStore.addOrder(this.checkoutData);
			}, 3000);
			this.loading = false;
			this.$router.push("/order");
		},
	},
};
</script>

<style scoped></style>