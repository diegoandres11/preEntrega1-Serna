
let mascotas=[
    {id:1, especie:"perro", genero:"macho", edadAños:3, color:"negro y blanco"},
    {id:2, especie:"gato", genero:"macho", edadAños:0.4, color:"naranja"},
    {id:3, especie:"gato", genero:"hembra", edadAños:7, color:"negro"},
    {id:4, especie:"conejo", genero:"hembra", edadAños:2, color:"blanco"},
    {id:5, especie:"perro", genero:"macho", edadAños:10, color:"negro"},
    {id:6, especie:"perro", genero:"hembra", edadAños:1, color:"cafe"},
    {id:7, especie:"pez", genero:"macho", edadAños:3, color:"griz"},
];


//funcion que muetra en pantalla todas las opciones par que el usuario escoja
const listar=(opciones, propiedad1, propiedad2, propiedad3, propiedad4) => "Ingrese el ID de la mascota que desea adoptar \n"+"Ingrese 0 para salir \n"+opciones.map( mascota =>"ID: "+mascota[propiedad1]+"  genero: "+mascota[propiedad2]+"  años: "+mascota[propiedad3]+"  color: "+mascota[propiedad4]).join("\n")


let carrito=[]
let idSeleccionado
while(idSeleccionado!=0){
    let animalBuscado = prompt("Ingrese la especie de animal que desea adoptar: ").toLowerCase()
    let opciones = mascotas.filter(el => el.especie === animalBuscado)
    idSeleccionado=parseInt(prompt(listar(opciones,"id", "genero", "edadAños", "color" )))
    adoptar(mascotas,opciones,idSeleccionado)
}




//funcion que hace el proceso de la adopcion
function adoptar(mascotas, opciones, id) {
    if (opciones.length === 0) {
        alert("Lo siento, no hay animales de esa especie disponibles para adopción.");
    } else {
        let indice = mascotas.findIndex(el => el.id === id);

        if (indice === -1) {
            alert("ID inválido. No se ha realizado la adopción.");
        } else {
            let animalAdoptado = mascotas.splice(indice, 1)[0];
            carrito.push(animalAdoptado); // Agregar la mascota seleccionada al carrito
            alert(`¡Felicidades por la adopción! Ha adoptado un ${animalAdoptado.especie} ${animalAdoptado.genero}, de ${animalAdoptado.edadAños} años de edad, de color ${animalAdoptado.color}.`);
        }
    }
}
