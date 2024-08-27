const fs = require("fs");

class CartManager {
  constructor() {
    this.loadCarts();
  }

  //Carga carrito desde JSON
  loadCarts() {
    try {
      const data = fs.readFileSync("cart.json", "utf8");
      this.carts = JSON.parse(data) || [];
      this.cartId =
        this.carts.length > 0
          ? Math.max(...this.carts.map((cart) => cart.id)) + 1
          : 1;
    } catch (error) {
      console.error("Error al cargar el carrito:", error.message);
      this.carts = [];
      this.cartId = 1;
    }
  }

  //Guarda datos en el Carrito
  saveCarts() {
    try {
      const data = JSON.stringify(this.carts, null, 2);
      fs.writeFileSync("cart.json", data, "utf8");
    } catch (error) {
      console.error("Error saving carts:", error.message);
    }
  }

  //Crea el nuevo carrito
  createCart() {
    const newCart = {
      id: this.cartId++,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  //Solicita carrito mediante ID
  getCartById(cartId) {
    return this.carts.find((cart) => cart.id === cartId);
  }

  //Agrega producto al carrito mediante POST
  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      console.log("Carrito no encontrado");
      return;
    }

    const existingProduct = cart.products.find(
      (item) => item.product === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    this.saveCarts();
  }
}

module.exports = CartManager;
