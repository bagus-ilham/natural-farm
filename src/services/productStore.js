import productJson from "../data/product.json";


export const productStore = {
  state: () => ({
    products: productJson
  }),
  getters: {
    getProduct: (state) => state.products,
  },
  actions: {
    addProduct(product){
      this.products.push(product);
    },
    removeProduct(product){
      this.products.splice(this.products.indexOf(product), 1);
    },
    updateProduct(product){
      const index = this.products.indexOf(product);
      this.products.splice(index, 1, product);
    },
    decreaseStockProduct(id){
      const index = this.products.findIndex((product) => product.id === id);
      this.products[index].stock--;
    },
  },
}

export default productStore;
