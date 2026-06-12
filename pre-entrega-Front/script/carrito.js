document.addEventListener('DOMContentLoaded', () => {
    cargarProductosCarrito();
});

function cargarProductosCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    const tabla = document.querySelector('#tabla_carrito');
    tabla.innerHTML = '';

    let subtotal = 0;

    if (carrito.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px;">
                    Tu carrito está vacío. Agregá productos desde la 
                    <a href="tienda.html">tienda</a>.
                </td>
            </tr>`;
    } else {
        carrito.forEach(producto => {
            tabla.innerHTML += crearFilaProducto(producto);
            subtotal += producto.price * producto.cantidad;
        });
    }

    actualizarTotal(subtotal);
    adjuntarEventosFila();
}


function crearFilaProducto(producto) {
    const subtotalProducto = (producto.price * producto.cantidad).toFixed(2);
    const titulo = producto.title.substring(0, 20) + '...';
    return `
        <tr>
            <td>
                <button class="remove-btn" data-id="${producto.id}">
                    <i class="far fa-times-circle"></i>
                </button>
            </td>
            <td>
                <img src="${producto.image}" alt="${producto.title}" 
                     style="height:80px; width:auto; object-fit:contain;">
            </td>
            <td>${titulo}</td>
            <td>$${producto.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${producto.cantidad}" min="1" 
                       class="cantidad-producto" data-id="${producto.id}">
            </td>
            <td>$${subtotalProducto}</td>
        </tr>
    `;
}

function actualizarTotal(subtotal) {
    document.querySelectorAll('#total').forEach(el => {
        el.textContent = `$${subtotal.toFixed(2)}`;
    });
}

function adjuntarEventosFila() {

    // Eliminar producto
    document.querySelectorAll('.remove-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
            const id = boton.dataset.id;
            carrito = carrito.filter(item => String(item.id) !== String(id));
            localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
            cargarProductosCarrito();
        });
    });

    // Cambiar cantidad
    document.querySelectorAll('.cantidad-producto').forEach(input => {
        input.addEventListener('change', () => {
            const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
            const id = input.dataset.id;
            const nuevaCantidad = parseInt(input.value);

            if (nuevaCantidad < 1) {
                input.value = 1;
                return;
            }

            const producto = carrito.find(item => String(item.id) === String(id));
            if (producto) {
                producto.cantidad = nuevaCantidad;
                localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
                recalcularTotales();
            }
        });
    });
}

function recalcularTotales() {
    const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    let subtotal = 0;

    document.querySelectorAll('#tabla_carrito tr').forEach(fila => {
        const input = fila.querySelector('.cantidad-producto');
        if (input) {
            const id = input.dataset.id;
            const producto = carrito.find(item => String(item.id) === String(id));
            if (producto) {
                const subtotalFila = (producto.price * producto.cantidad).toFixed(2);
                fila.cells[5].textContent = `$${subtotalFila}`;
                subtotal += producto.price * producto.cantidad;
            }
        }
    });

    actualizarTotal(subtotal);
}