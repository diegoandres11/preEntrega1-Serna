let mascotas=[
    {id:1, especie:"perro", genero:"macho", edadAños:3, color:"negro y blanco", rutaImg:"perro-blancoynegro.jpg"},
    {id:2, especie:"gato", genero:"macho", edadAños:0.4, color:"naranja", rutaImg:"gato-naranja.avif"},
    {id:3, especie:"gato", genero:"hembra", edadAños:7, color:"negro", rutaImg:"gato-negro.jpg"},
    {id:4, especie:"conejo", genero:"hembra", edadAños:2, color:"blanco", rutaImg:"conejo-blanco.jpg"},
    {id:5, especie:"perro", genero:"macho", edadAños:10, color:"negro", rutaImg:"perro-negro.jpg"},
    {id:6, especie:"perro", genero:"hembra", edadAños:1, color:"cafe", rutaImg:"perro-cafe.jpg"},
    {id:7, especie:"pez", genero:"macho", edadAños:3, color:"griz", rutaImg:"pez-gris.jpg"}
]

function principal(mascotas) {
    let carrito = []

    let botonBuscar = document.getElementById("botonBuscar")
    botonBuscar.addEventListener("click", function() {
        filtrarYRenderizar(mascotas, carrito)
    })

    let botonBuscarGenero = document.getElementById("botonBuscarGenero")
    botonBuscarGenero.addEventListener("click", function() {
        filtrarPorGenero(mascotas, carrito)
    })

    renderizarProductos(mascotas, carrito)
}

function filtrarYRenderizar(mascotas, carrito) {
    let productosFiltrados = filtrarProductos(mascotas)
    renderizarProductos(productosFiltrados, carrito)
}

function filtrarProductos(productos) {
    let inputBusqueda = document.getElementById("inputBusqueda")
    return productos.filter(producto => producto.especie.includes(inputBusqueda.value))
}

function filtrarPorGenero(mascotas, carrito) {
    let inputBusquedaGenero = document.getElementById("inputBusquedaGenero")
    let genero = inputBusquedaGenero.value.toLowerCase()
    let productosFiltrados = mascotas.filter(mascota => mascota.genero.toLowerCase() === genero)
    renderizarProductos(productosFiltrados, carrito)
}

function renderizarProductos(mascotas, carrito) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""

    mascotas.forEach(mascota => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjeta"

        tarjetaProducto.innerHTML = `
            <h3>${mascota.especie}</h3>
            <img class='imgTarjeta' src=./assets/img/${mascota.rutaImg} />
            <button id=botonCarrito${mascota.id}>Agregar al carrito</button>
        `

        contenedorProductos.appendChild(tarjetaProducto)

        let botonAgregarAlCarrito = document.getElementById("botonCarrito" + mascota.id)
        botonAgregarAlCarrito.addEventListener("click", function(e) {
            agregarProductoAlCarrito(e, mascotas, carrito)
        })
    })
}

function agregarProductoAlCarrito(e, mascotas, carrito) {
    let idDelProducto = Number(e.target.id.substring(12))
    console.log(idDelProducto)

    let productoBuscado = mascotas.find(producto => producto.id === idDelProducto)

    carrito.push({
        id: productoBuscado.id,
        especie: productoBuscado.especie,
        genero: productoBuscado.genero,
        edadAños: productoBuscado.edadAños,
        color: productoBuscado.color,
        rutaImg: productoBuscado.rutaImg
    })

    console.log(carrito)
    renderizarCarrito(carrito)
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    contenedorCarrito.innerHTML = ""
    carrito.forEach(producto => {
        let tarjetaProductoCarrito = document.createElement("div")
        tarjetaProductoCarrito.className = "tarjetaProductoCarrito"

        tarjetaProductoCarrito.innerHTML = `
            <p>Especie: ${producto.especie}</p>
            <p>Genero: ${producto.genero}</p>
            <img class='imgTarjeta' src=./assets/img/${producto.rutaImg} />
        `

        contenedorCarrito.appendChild(tarjetaProductoCarrito)
    })
}

principal(mascotas)
