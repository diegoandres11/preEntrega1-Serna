async function pedirInfo() {
    try {
        let response = await fetch("./data.json")
        let mascotas = await response.json()
        return mascotas
    } catch (error) {
        alert("sucedió un error")
    }
}

function mostrarDetalleMascota(mascota) {
    Swal.fire({
        title: mascota.especie,
        text: mascota.descripcion,
        imageUrl: `./assets/img/${mascota.rutaImg}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText: 'Salir',
    })
}

async function principal() {
    const mascotas = await pedirInfo()
    if (mascotas) {
        const carrito = obtenerCarritoLS()

        mascotas.forEach(mascota => {
            mascota.enCarrito = false
        })

        carrito.forEach(item => {
            const mascota = mascotas.find(m => m.id === item.id)
            if (mascota) {
                mascota.enCarrito = true
            }
        })

        let botonBuscar = document.getElementById("botonBuscar")
        botonBuscar.addEventListener("click", function() {
            filtrarYRenderizar(mascotas, carrito)
        })

        let botonBuscarGenero = document.getElementById("botonBuscarGenero")
        botonBuscarGenero.addEventListener("click", function() {
            filtrarPorGenero(mascotas, carrito)
        })

        renderizarMascotas(mascotas, carrito)
        renderizarCarrito(mascotas, carrito)
    }
}

function filtrarYRenderizar(mascotas, carrito) {
    let mascotasFiltradas = filtrarMascotas(mascotas)
    renderizarMascotas(mascotasFiltradas, carrito)
}

function filtrarMascotas(mascotas) {
    let inputBusqueda = document.getElementById("inputBusqueda")
    return mascotas.filter(mascota => mascota.especie.includes(inputBusqueda.value))
}

function filtrarPorGenero(mascotas, carrito) {
    let inputBusquedaGenero = document.getElementById("inputBusquedaGenero")
    let genero = inputBusquedaGenero.value.toLowerCase()
    let mascotasFiltradas = mascotas.filter(mascota => mascota.genero.toLowerCase() === genero)
    renderizarMascotas(mascotasFiltradas, carrito)
}

function renderizarMascotas(mascotas, carrito) {
    let contenedorMascotas = document.getElementById("contenedorProductos")
    contenedorMascotas.innerHTML = ""

    mascotas.forEach(mascota => {
        if (!mascota.enCarrito) {
            let tarjetaMascota = document.createElement("div")
            tarjetaMascota.className = "tarjeta"

            tarjetaMascota.innerHTML = `
                <h3>${mascota.especie}</h3>
                <img class='imgTarjeta' src='./assets/img/${mascota.rutaImg}' />
                <button id='botonCarrito${mascota.id}'>Agregar al carrito</button>
                <button class="botonDetalle" data-id="${mascota.id}">¡Conoce más!</button>
            `

            contenedorMascotas.appendChild(tarjetaMascota)

            let botonAgregarAlCarrito = document.getElementById("botonCarrito" + mascota.id)
            botonAgregarAlCarrito.addEventListener("click", function(e) {
                agregarMascotaAlCarrito(e, mascotas, carrito)
            })
        }
    })

    let botonesDetalle = document.querySelectorAll(".botonDetalle")
    botonesDetalle.forEach(boton => {
        boton.addEventListener("click", function(e) {
            let idMascota = e.target.getAttribute("data-id")
            let mascota = mascotas.find(m => m.id == idMascota)
            mostrarDetalleMascota(mascota)
        })
    })
}

function agregarMascotaAlCarrito(e, mascotas, carrito) {
    let idMascota = Number(e.target.id.substring(12))
    console.log(idMascota)

    let mascotaBuscada = mascotas.find(mascota => mascota.id === idMascota)

    if (mascotaBuscada && !mascotaBuscada.enCarrito) {
        mascotaBuscada.enCarrito = true
        carrito.push({
            id: mascotaBuscada.id,
            especie: mascotaBuscada.especie,
            genero: mascotaBuscada.genero,
            edadAños: mascotaBuscada.edadAños,
            color: mascotaBuscada.color,
            rutaImg: mascotaBuscada.rutaImg
        })

        console.log("Carrito actualizado:", carrito)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarMascotas(mascotas, carrito)
        renderizarCarrito(mascotas, carrito)
    } else {
        console.log("La mascota ya está en el carrito o no se encontró en el array de mascotas.")
    }
}

function eliminarMascotaDelCarrito(e, mascotas, carrito) {
    let idMascota = Number(e.target.id.substring(13))
    console.log(idMascota)

    let indexCarrito = carrito.findIndex(mascota => mascota.id === idMascota)
    if (indexCarrito !== -1) {
        carrito.splice(indexCarrito, 1)
        let mascotaBuscada = mascotas.find(mascota => mascota.id === idMascota)
        if (mascotaBuscada) {
            mascotaBuscada.enCarrito = false
        }

        console.log("Carrito actualizado:", carrito)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarMascotas(mascotas, carrito)
        renderizarCarrito(mascotas, carrito)
    } else {
        console.log("La mascota no se encontró en el carrito.")
    }
}

function renderizarCarrito(mascotas, carrito) {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    contenedorCarrito.innerHTML = ""
    carrito.forEach(mascota => {
        let tarjetaMascotaCarrito = document.createElement("div")
        tarjetaMascotaCarrito.className = "tarjetaProductoCarrito"

        tarjetaMascotaCarrito.innerHTML = `
            <p>Especie: ${mascota.especie}</p>
            <p>Género: ${mascota.genero}</p>
            <img class='imgTarjeta' src='./assets/img/${mascota.rutaImg}' />
            <button id='botonEliminar${mascota.id}'>Eliminar del carrito</button>
        `

        contenedorCarrito.appendChild(tarjetaMascotaCarrito)

        let botonEliminarDelCarrito = document.getElementById("botonEliminar" + mascota.id)
        botonEliminarDelCarrito.addEventListener("click", function(e) {
            console.log(e.target.id)
            eliminarMascotaDelCarrito(e, mascotas, carrito)
        })
    })
}

function obtenerCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

pedirInfo().then(principal)
