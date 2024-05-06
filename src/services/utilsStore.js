const utilsStore = {
    state: {
      snackbar: false,
    },
    getSnackbar() {
      return this.state.snackbar;
    },
    showSnackbar() {
      this.state.snackbar = true;
      setTimeout(() => {
        this.state.snackbar = false;
      }, 3000);
    },
  };
  
  export default utilsStore;