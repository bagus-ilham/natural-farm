<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="p-5 bg-white shadow-md rounded-lg">
      <div class="flex justify-between mb-5">
        <div></div>
        <button @click="showModal = true"
          class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Add Order
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">Customer</th>
              <th class="px-4 py-2 text-left">Payment</th>
              <th class="px-4 py-2 text-left">Total Discount</th>
              <th class="px-4 py-2 text-left">Total Price</th>
              <th class="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <td class="border px-4 py-2">{{ order.customer?.customer_name }}</td>
              <td class="border px-4 py-2">{{ order.payment?.name }}</td>
              <td class="border px-4 py-2">{{ formatCurrency(order.totalDiscount) }}</td>
              <td class="border px-4 py-2">{{ formatCurrency(order.totalPrice) }}</td>
              <td class="border px-4 py-2">
                <button @click="deleteOrder(order.id)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed mt-10 z-10 inset-0 overflow-y-scroll h-5/6">
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl mx-4 sm:mx-auto">
          <div class="mb-4">
            <label for="customer" class="block text-gray-700 font-bold mb-2">Pilih Customer</label>
            <select id="customer" v-model="selectedCustomer"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option v-for="customer in customers" :key="customer.id" :value="customer">{{ customer.customer_name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label for="payment" class="block text-gray-700 font-bold mb-2">Pilih Payment</label>
            <select id="payment" v-model="selectedPayment"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option v-for="payment in payments" :key="payment.id" :value="payment">{{ payment.name }}</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="product" class="block text-gray-700 font-bold mb-2">Pilih Product</label>
            <select id="product" v-model="selectedProducts" multiple
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option v-for="product in products" :key="product.id" :value="product">{{ product.name }}</option>
            </select>
          </div>

          <div v-for="(product, index) in selectedProducts" :key="index" class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Quantity :
            <input type="number" v-model="productQuantities[product.id]" class="w-16 ml-3 text-center" min="1" max="100" />
          </label>
          </div>

          <div v-for="(product, index) in selectedProducts" :key="index" class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Discount for {{ product.name }}</label>
            <input type="number" v-model="productDiscounts[product.id]"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" max="100"/>
          </div>

          <div class="mb-4">
            <label for="additionalDiscount" class="block text-gray-700 font-bold mb-2">Input Discount Tambahan</label>
            <input type="number" id="additionalDiscount" v-model="additionalDiscount"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" max="100" />
          </div>

          <div class="mb-4">
            <p class="text-gray-700 font-bold">Selected Products:</p>
            <ul>
              <li v-for="(product, index) in selectedProducts" :key="index">
                {{ product.name }} - Discount: {{ productDiscounts[product.id] || 0 }}
              </li>
            </ul>
            <p class="text-gray-700 font-bold mt-4">Price: {{ formatCurrency(totalPrice) }}</p>
            <p class="text-gray-700 font-bold">Total Discount: {{ formatCurrency(totalDiscount) }}</p>
            <p class="text-gray-700 font-bold">Total Price: {{ formatCurrency(finalPrice) }}</p>
          </div>

          <div class="flex justify-end">
            <button @click="showModal = false"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button @click="submitOrder" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import customersJSON from "../data/customers.json";
import paymentsJSON from "../data/payment.json";
import productsJSON from "../data/product.json";
import orderStore from "../services/orderStore";
import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';

const showModal = ref(false);
const selectedCustomer = ref(null);
const selectedPayment = ref(null);
const selectedProducts = ref([]);
const productDiscounts = ref({});
const productQuantities = ref({});
const additionalDiscount = ref(0);

const customers = customersJSON.data;
const payments = paymentsJSON;
const products = productsJSON;
const orders = computed(() => orderStore.getOrders());

const totalPrice = computed(() => {
  let total = 0;
  selectedProducts.value.forEach((product) => {
    total += product.price * (productQuantities.value[product.id] || 1);
  });
  return total;
});

const totalDiscount = computed(() => {
  let discount = 0;
  selectedProducts.value.forEach((product) => {
    discount += (product.price * (productDiscounts.value[product.id] || 0) / 100) * (productQuantities.value[product.id] || 1);
  });
  discount += totalPrice.value * (additionalDiscount.value / 100);
  return discount;
});

const finalPrice = computed(() => {
  return totalPrice.value - totalDiscount.value;
});

const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(amount);
};

const submitOrder = () => {
  if (!selectedCustomer.value || !selectedPayment.value || selectedProducts.value.length === 0) {
    Toastify({
      text: "Mohon lengkapi semua field sebelum submit order.",
      style: {
        background: "linear-gradient(to right, #f00, #ff0)",
      },
      gravity: "bottom",
      position: "center",
      duration: 3000,
      close: true,
      stopOnFocus: true,
    }).showToast();
    return; 
  }
  const order = {
    customer: selectedCustomer.value,
    payment: selectedPayment.value,
    products: selectedProducts.value.map((product) => ({
      ...product,
      quantity: productQuantities.value[product.id] || 1,
      discount: productDiscounts.value[product.id] || 0,
    })),
    additionalDiscount: additionalDiscount.value,
    totalPrice: finalPrice.value,
    totalDiscount: totalDiscount.value,
  };

  orderStore.addOrder(order);

  showModal.value = false;

  selectedCustomer.value = null;
  selectedPayment.value = null;
  selectedProducts.value = [];
  productDiscounts.value = {};
  productQuantities.value = {};
  additionalDiscount.value = 0;

  Toastify({
    text: "Order berhasil dibuat!",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
};

const deleteOrder = (id) => {
  const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus order ini?");
  
  if (confirmDelete) {
    orderStore.deleteOrder(id);

    Toastify({
      text: "Order berhasil dihapus.",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
  }
};
</script>

<style scoped></style>
