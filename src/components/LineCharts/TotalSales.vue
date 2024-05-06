<template>
  <div class="relative flex flex-col w-full h-40 p-3 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
    <div class="flex flex-col items-center justify-center h-full">
      <h2 class="text-lg font-bold text-gray-800 mb-2">Total Sales</h2>
      <p class="text-3xl font-semibold text-indigo-600">{{ formattedTotalSales }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalesTotal",
  data() {
    return {
      totalSales: 0,
    };
  },
  computed: {
    formattedTotalSales() {
      return this.totalSales.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("sales-data.json");
        const data = await response.json();
        this.totalSales = data.stats.reduce((total, item) => total + item.value, 0);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
/* Add any styles for the SalesTotal component if needed */
</style>