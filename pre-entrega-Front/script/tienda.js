

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(productos => {
        productosGlobales = productos;
        const cardsHTML = productos.map(
            ({ id, title, category, price, image }) => {

                return `
            <div class="producto">
                <img src="${image}" alt="${title}">
                <div class="producto-descripcion">
                    <span>${category}</span>
                    <h5>${title}</h5>
                    <h4>$${price.toFixed(2)}</h4>
                </div>
                <a id="btn-ver-${id}" class="ver-descripcion">
                    Ver descripción
                </a>
                <a id="btn-agregar-${id}" class="carrito">
                    <i class="fal fa-shopping-cart"></i> Agregar
                </a>
            </div>
        `;

            });

        contenedor.innerHTML = cardsHTML.join('');
        adjuntarEventos();

    });

const contenedor = document.querySelector('.productos-container');
let productosGlobales = [];

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

    const indiceExistente = carrito.findIndex(item => item.id === producto.id);

    if (indiceExistente !== -1) {
        carrito[indiceExistente].cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.title,
            price: producto.price,
            image: producto.image,
            cantidad: 1
        });
    }

    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
    alert(`${producto.title} agregado al carrito!`);
}

function adjuntarEventos() {
    productosGlobales.forEach(producto => {
        const boton = document.getElementById(`btn-agregar-${producto.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        }

        const btnVer = document.getElementById(`btn-ver-${producto.id}`);
        if (btnVer) {
            btnVer.addEventListener('click', () => {
                abrirModal(producto);
            })
        }

    });
}

function abrirModal(producto) {
    document.getElementById('modalImagen').src = producto.image;
    document.getElementById('modalImagen').alt = producto.title;
    document.getElementById('modalTitulo').textContent = producto.title;
    document.getElementById('modalDescripcion').textContent = producto.description;
    document.getElementById('modalPrecio').textContent = `$${producto.price.toFixed(2)}`;
    document.getElementById('overlayModal').classList.add('visible');

}

function cerrarModal() {
    document.getElementById('overlayModal').classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal)
    document.getElementById('overlayModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('overlayModal')) {
            cerrarModal();
        }
    })
})