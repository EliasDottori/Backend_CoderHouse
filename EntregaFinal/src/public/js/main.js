document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelector("button[data-id]");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", async () => {
      const productId = addToCartButton.getAttribute("data-id");

      try {
        const response = await fetch("/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: 1, product: productId, quantity: 1 }),
        });

        if (response.ok) {
          alert("Producto agregado al carrito");
        } else {
          alert("Error al agregar el producto al carrito");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
});
