<template>
  <div class="relative flex flex-col w-full max-h-[120rem] items-center rounded-xl p-4 bg-indigo-50 border border-indigo-100 space-y-3 overflow-hidden">
    <div class="flex flex-col w-full h-80">
      <div class="flex justify-between p-2">
        <span class="text-lg font-bold">Transactions</span>
        <button class="flex items-center justify-center border border-red-500 bg-red-600 h-8 w-8 rounded-lg text-white text-xl font-bold tracking-widest hover:bg-white hover:text-red-600 hover:cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
        </button>
      </div>
      <Simplebar class="flex w-full h-full overflow-auto" :="{...scrollbarOptions}">
        <TransactionsList :transactions="transactions" />
      </Simplebar>
    </div>
  </div>
  <div class="mt-5 relative flex w-full bg-white shrink-0 rounded-lg overflow-hidden">
    <SalesChart :salesData="salesData" />
  </div>
</template>

<script>
import TransactionsList from "../Transactions/TransactionsList.vue";
import SalesChart from "../LineCharts/TotalSales.vue";


export default {
  name: "SideBar",
  components: { TransactionsList, SalesChart },
  data () {
    return {
      transactions: [],
      salesData: [],
      scrollbarOptions: { autoHide: true },
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("transactions-data.json");
        const data = await response.json();
        this.transactions = data;

        const salesResponse = await fetch("sales-data.json");
        const salesData = await salesResponse.json();
        this.salesData = salesData;
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
  },
  mounted () {
    this.fetchData();
  }
};
</script>