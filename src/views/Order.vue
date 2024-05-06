<template>
    <v-container fluid>
      <v-sheet class="pa-5" :elevation="1" border height="100%" width="100%">
        <v-card title="Orders" flat>
          <template v-slot:text>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
            <v-btn
              prepend-icon="mdi-plus"
              class="my-5"
              color="success"
              variant="outlined"
              @click="$router.push('/order/add')"
              >Add Order</v-btn
            >
          </template>
          <v-data-table :headers="headers" :items="orders" :search="search">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.customer.customer_name }}</td>
                <td>{{ item.payment.name }}</td>
                <td>{{ formatCurrency(item.totalDiscount) }}</td>
                <td>{{ formatCurrency(item.totalPrice) }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-sheet>
      <v-snackbar v-model="snackbar" :timeout="2000" color="success">
        Success Adding Data
      </v-snackbar>
    </v-container>
  </template>
  
  <script>
  import orderStore from '../services/orderStore';
  import utilsStore from '../services/utilsStore';
  
  export default {
    data() {
      return {
        search: '',
        headers: [
          {
            align: 'start',
            key: 'customer.customer_name',
            sortable: false,
            title: 'Customer',
          },
          { key: 'payment.name', title: 'Payment' },
          { key: 'totalDiscount', title: 'Total Discount' },
          { key: 'totalPrice', title: 'Total Price' },
        ],
      };
    },
    computed: {
      orders() {
        return orderStore.getOrders();
      },
      snackbar() {
        return utilsStore.getSnackbar();
      },
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          this.orders = await fetchOrders();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      formatCurrency(amount) {
        const formatter = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        });
        return formatter.format(amount);
      },
    },
  };
  </script>
  
  <style scoped></style>