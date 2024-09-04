const socket = io();

socket.emit("mensProduct", "Mensaje desde producto");

const agregarProducto = document.querySelector("#agregarProducto");

socket.on("productosNuevos", (data) => {
  console.log(data);

  const div = document.querySelector("#containProducts");

  div.innerHTML = `${data
    .map(
      (producto) =>
        `<div class="producto">
        <h2> ${producto.nombre} </h2>
        <div>
            <p> Bodega: ${producto.bodega} </p>
            <p> Tipo: ${producto.tipo} </p>
            <p> Variedad: ${producto.variedad} </p>
            <p> Año: ${producto.ano} </p>
        </div>
        <h3> Precio: ${producto.precio} </h3>
        <button>Agregar</button>
    </div>`
    )
    .join("")}`;
});

agregarProducto.addEventListener("click", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre");
  const bodega = document.querySelector("#bodega");
  const tipo = document.querySelector("#tipo");
  const variedad = document.querySelector("#variedad");
  const ano = document.querySelector("#ano");
  const precio = document.querySelector("#precio");

  const productoNuevo = {
    nombre: nombre.value,
    bodega: bodega.value,
    tipo: tipo.value,
    variedad: variedad.value,
    ano: ano.value,
    precio: precio.value,
  };

  socket.emit("productoNuevo", productoNuevo);
});
