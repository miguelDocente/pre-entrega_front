/*
const productos = document.querySelector('.productos-container');
console.log(productos)

productos.textContent = "bienvenidos a la tienda"

// productos.addEventListener('click', () =>
    //     {
//       productos.textContent = "haz hecho click en el contenedor de productos";
//       productos.style.backgroundColor = "red";  
//     } );

// desestructuracion: permite extraer propiedades de un objeto o elementos de un array y asignarlos a variables independientes.

const producto = {
    nombre: "camisa",
    precio: 20,
    categoria: "ropa"
}

console.log(producto.nombre) // forma tradicional de acceder a una propiedad de un objeto
const { nombre, precio, categoria } = producto; // desestructuracion
console.log(nombre) // forma de acceder a una propiedad de un objeto utilizando desestructuracion
console.log(precio)
console.log(categoria)

function mostrarProducto({ nombre, precio, categoria }) {
    // template literals: permite incrustar expresiones dentro de cadenas de texto utilizando la sintaxis ${expresion}
    console.log(`El producto es ${nombre}, su precio es ${precio} y su categoria es ${categoria}`);
}
mostrarProducto(producto);

productos.innerHTML = "<h2>Agregamos titulo</h2>"
// productos.textContent = "<h2>Agregamos titulo</h2>"

productos.innerHTML = `
<h2>${nombre}</h2>
<p>Precio: ${precio}</p>
<p>Categoria: ${categoria}</p>
`;
*/

// 1. Array con la información de los productos
const productos = [
    {
        id: 1,
        nombre: 'Smartphone último modelo',
        categoria: 'Celulares',
        precio: 299.99,
        imagen: '../img/productos/calular.jpg',
        descripcion: 'Pantalla AMOLED, cámara de 108MP y batería de larga duración.'
    },
    {
        id: 2,
        nombre: 'Auriculares inalámbricos',
        categoria: 'Audio',
        precio: 89.99,
        imagen: '../img/productos/auriculares.jpg',
        descripcion: 'Cancelación de ruido activa y hasta 30hs de autonomía.'
    },
    {
        id: 3,
        nombre: 'Remera estampada premium',
        categoria: 'Moda',
        precio: 39.99,
        imagen: '../img/productos/f7.jpg',
        descripcion: 'Tela 100% algodón con estampado de alta definición.'
    },
    {
        id: 4,
        nombre: 'Campera impermeable',
        categoria: 'Moda',
        precio: 129.99,
        imagen: '../img/productos/f6.jpg',
        descripcion: 'Resistente al agua, ideal para actividades al aire libre.'
    },
    {
        id: 5,
        nombre: 'Tablet 10" Full HD',
        categoria: 'Tablets',
        precio: 349.99,
        imagen: '../img/productos/tablet.jpg',
        descripcion: 'Pantalla Full HD, 4GB RAM y 64GB de almacenamiento.'
    },
    {
        id: 6,
        nombre: 'Kit accesorios gaming',
        categoria: 'Accesorios',
        precio: 59.99,
        imagen: '../img/productos/n6.jpg',
        descripcion: 'Mouse, teclado y auriculares gaming en un solo kit.'
    },
    {
        id: 7,
        nombre: 'Proyector portátil HD',
        categoria: 'Video',
        precio: 199.99,
        imagen: '../img/productos/proyector.jpg',
        descripcion: 'Resolución HD, 100 pulgadas de proyección y 3hs de batería.'
    },
    {
        id: 8,
        nombre: 'Smart TV 55" 4K',
        categoria: 'TV',
        precio: 799.99,
        imagen: '../img/productos/television.jpg',
        descripcion: 'Panel 4K UHD, Smart TV con acceso a todas las plataformas.'
    }
];

// paso 2 Crear el html de cada card
// usar map para recorrer el array y generar el HTML

const cardsHTML = productos.map(
    ({ id, nombre, categoria, precio, imagen }) => {

        return `
        <div class="producto">
            <img src="${imagen}" alt="${nombre}">
            <div class="producto-descripcion">
                <span>${categoria}</span>
                <h5>${nombre}</h5>
                <h4>$${precio.toFixed(2)}</h4>
            </div>
            <button class="btn-descripcion">
                Ver descripción
            </button>
            <a id="btn-agregar-${id}" class="carrito">
                <i class="fal fa-shopping-cart"></i> Agregar
            </a>
        </div>
    `;

});

console.log(cardsHTML.join(''))

// paso 3 tomar el elemento e insertar el array
const contenedor = document.querySelector('.productos-container');

contenedor.innerHTML = cardsHTML.join('');

