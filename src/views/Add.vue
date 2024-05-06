<template>
    <v-container fluid>
      <v-sheet class="pa-5" :elevation="1" height="100%" width="100%">
        <span class="text-h5 my-10">Add Checkout</span>
        <v-form @submit.prevent="onSubmit">
          <v-row class="mt-10">
            <v-col cols="12" sm="4">
              <div>
                <v-autocomplete
                  label="Customer"
                  :items="customers"
                  item-title="customer_name"
                  item-value="customers"
                  variant="outlined"
                  return-object
                  v-model="checkoutData.customer"
                ></v-autocomplete>
              </div>
              <div>
                <v-autocomplete
                  label="Payment"
                  :items="payments"
                  item-title="name"
                  item-value="payments"
                  variant="outlined"
                  return-object
                  v-model="checkoutData.payment"
                ></v-autocomplete>
              </div>
              <div class="mt-10">
                <p class="text-h5 my-5">Detail Order</p>
                <p class="text-subtitle-1">
                  {{ checkoutData.customer.customer_name }}
                </p>
                <p class="text-subtitle-2 text-right">
                  {{ checkoutData.payment.name }}
                </p>
                <div class="my-5">
                  <p class="text-subtitle-2">Product Order</p>
                  <ul class="mx-5" v-auto-animate>
                    <li
                      v-for="(item, index) in checkoutData.products"
                      :key="index"
                    >
                      <p>{{ item.name }}</p>
                      <p>Qty: {{ item.quantity }}</p>
                      <p>Price: {{ formatCurrency(item.price) }}</p>
                      <p>
                        Discount:
                        {{
                          formatCurrency(
                            calculateDiscountPrice(item.price, item.discount)
                          )
                        }}
                        ({{ item.discount }}%)
                      </p>
                      <p>
                        Total:
                        {{
                          formatCurrency(
                            calculateTotal(item.quantity, item.price)
                          )
                        }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </v-col>
  
            <v-col cols="12" sm="8">
              <p class="text-h6 pb-5">
                Products
                <v-btn
                  color="primary"
                  class="ml-5"
                  prepend-icon="mdi-plus"
                  variant="outlined"
                  @click="addProduct"
                >
                  Add Product
                </v-btn>
              </p>
  
              <v-card
                elevation="0"
                class="d-flex flex-wrap border border-md"
                min-height="200px"
                v-auto-animate
              >
                <checkout-product-item
                  v-auto-animate
                  v-for="(product, index) in checkoutData.products"
                  :product="product"
                  :key="index"
                  @change="updateProduct"
                  :products="products"
                  @delete="deleteProduct"
                />
              </v-card>
            </v-col>
          </v-row>
          <v-row align="end" justify="end" class="ma-10">
            <v-btn
              :disabled="checkoutData.products.length === 0"
              :loading="loading"
              color="success"
              size="large"
              type="submit"
              variant="elevated"
            >
              Save
            </v-btn>
          </v-row>
        </v-form>
      </v-sheet>
    </v-container>
  </template>
  
  <script>
  import { v4 as uuidv4 } from 'uuid';
  import add from './Add.vue';
  import customerStore from '../services/customerStore.js';
  import paymentStore from '../services/paymentStore';
  import productStore from '../services/productStore';
  import utilsStore from '../services/utilsStore';
  import orderStore from '../services/orderStore';
  
  export default {
    components: {
      add,
    },
    data() {
      return {
        loading: false,
        customers: customerStore.getCustomers(),
        payments: paymentStore.getPayments(),
        products: productStore.getProducts(),
        checkoutData: {
          customer: { customer_name: '' },
          payment: { name: '' },
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
          console.error('Error fetching data:', error);
        }
      },
      updateProduct(product) {
        const index = this.checkoutData.products.findIndex(
          (p) => p.id === product.id
        );
        this.checkoutData.products.splice(index, 1, product);
      },
      deleteProduct(product) {
        const index = this.checkoutData.products.findIndex(
          (p) => p.id === product.id
        );
        this.checkoutData.products.splice(index, 1);
      },
      addProduct() {
        this.checkoutData.products.push({
          id: uuidv4(),
          name: '',
          price: 0,
          discount: 0,
          quantity: 1,
        });
      },
      calculateDiscountPrice(price, discount) {
        return (this.checkoutData.totalDiscount = (price * discount) / 100);
      },
      formatCurrency(amount) {
        const formatter = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        });
  
        return formatter.format(amount);
      },
      calculateTotal(qty, price) {
        return (this.checkoutData.totalPrice =
          qty * price - this.checkoutData.totalDiscount);
      },
      onSubmit() {
        this.loading = true;
        utilsStore.showSnackbar();
        setTimeout(() => {
          orderStore.addOrder(this.checkoutData);
        }, 3000);
        this.loading = false;
        this.$router.push('/order');
      },
    },
  };
  </script>
  
  <style scoped></style>