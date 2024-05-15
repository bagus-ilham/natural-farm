<template>
  <div class="container mx-auto">
    <div class="p-5 bg-white shadow-md">
      <div class="flex justify-between mb-5">
        <div></div>
        <button @click="$router.push('/order/add')" class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 justify-end">Add Order</button>
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-left">Customer</th>
            <th class="text-left">Payment</th>
            <th class="text-left">Total Discount</th>
            <th class="text-left">Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="index">
            <td>{{ item.customer.customer_name }}</td>
            <td>{{ item.payment.name }}</td>
            <td>{{ formatCurrency(item.totalDiscount) }}</td>
            <td>{{ formatCurrency(item.totalPrice) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="snackbar" class="fixed bottom-0 right-0 m-5 p-3 bg-green-500 text-white rounded shadow">
      Success Adding Data
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import orderStore from "../services/orderStore";

const orders = computed(() => orderStore.getOrders());
const snackbar = ref(false);

const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(amount);
};
</script>

<style scoped></style>
