// Array global para almacenar datos de los productos
let data = [];
// Selecciona el contenedor de productos en el DOM
const container_products = document.getElementById("container_products");

// Función para generar la tarjeta de un producto
const TargetsAll = (e) => {
  // Crear el contenedor principal para cada tarjeta
  const Card = document.createElement("div");
  Card.className = "Card"; // Asigna la clase CSS para estilos
  // Agregar función de clic para abrir el modal con información del producto
  Card.setAttribute("onclick", `start_modal(${JSON.stringify(e)})`);
  container_products.appendChild(Card);

  // Contenido interno de la tarjeta, incluye imagen, título y precio
  Card.innerHTML = `
    <div class="img--container">
      <img src="${e.image}" alt="Imagen del producto" />
    </div>
    <p>${e.title}</p>
    <strong>€ ${e.price}</strong>
  `;
};

// Función para obtener los datos de productos desde un archivo JSON
const API = async () => {
  // Realiza una petición fetch para obtener el archivo JSON
  const response = await fetch("./products.JSON");
  const information = await response.json();

  // Itera sobre los datos obtenidos y los renderiza
  information.forEach((e) => {
    TargetsAll(e); // Genera una tarjeta para cada producto
    data.push(e); // Almacena el producto en el array global
  });
};

// Llama a la función para cargar los datos
API();

// Referencia al modal en el DOM
const modal = document.getElementById("modal");

// Función para abrir el modal con información detallada del producto
const start_modal = (productData) => {
  // Contenido dinámico del modal
  modal.innerHTML = `
    <div class="container__modal">
      <span id="close" onclick="end_modal()">X</span>
      <div class="container__modal--img">
        <img src="${productData.image}" alt="Imagen del producto" />
      </div>
      <div class="container__modal--txt">
        <h2>${productData.title}</h2>
        <p>${productData.category}</p>
        <h5>${productData.description || "No disponible"}</h5>
        <strong>€ ${productData.price}</strong>
      </div>
    </div>
  `;
  modal.style.display = "flex"; // Muestra el modal
};

// Función para cerrar el modal
const end_modal = () => {
  modal.style.display = "none"; // Oculta el modal
};
