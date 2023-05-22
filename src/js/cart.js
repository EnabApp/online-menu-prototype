function cart() {
  return (
    {
      cart: null,
      initCart: function() {
        const storedCart = localStorage.getItem('cart');
        this.cart = storedCart ? JSON.parse(storedCart) : [];
      },
      saveCartToLocalStorage: function() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      },
      addItem: function(item) {
        const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          existingItem.count += item.count;
        } else {
          this.cart.push(item);
        }
        this.saveCartToLocalStorage();
      },
      removeItem: function(itemId) {
        const existingItem = this.cart.find((item) => item.id === itemId);
        if (existingItem) {
          if (existingItem.count > 1) {
            existingItem.count -= 1;
          } else {
            this.cart = this.cart.filter((item) => item.id !== itemId);
          }
          this.saveCartToLocalStorage();
        }
      },
      getTotalPrice: function() {
        let totalPrice = 0;
        for (const item of this.cart) {
          totalPrice += item.price * item.count;
        }
        return totalPrice;
      },
      getTotalItems: function() {
        return this.cart.length;
      },
      isItemInCart: function(itemId) {
        return this.cart.some((item) => item.id === itemId);
      },
      getItemCount: function(itemId) {
        const item = this.cart.find((item) => item.id === itemId);
        return item ? item.count : 0;
      }
    }
    );
}