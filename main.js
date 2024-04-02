

let peso=Number(prompt("ingrese su peso en kilogramos: "))
let estatura=Number(prompt("ingrese su estatura en centimetros: "))
while(isNaN(peso) || isNaN(estatura)){
    alert("¡EL VALOR INGRESADO ES INCORRECTO!")
    peso=Number(prompt("ingrese su peso en kilogramos: "))
    estatura=Number(prompt("ingrese su estatura en centimetros: "))
}
estatura=convertorMetros(estatura)
let imc=calculaIMC(peso,estatura)
mostrarResultados(imc)

/*funcion que convierte una estatura de centimetros a metros */
function convertorMetros(estatura){
    let estaturaMetros=estatura/100
    return estaturaMetros
}

/*funcion que calcula el indice de masa corporal de una persona */
function calculaIMC(peso, estatura){
    let imc= peso/ (estatura**2)
    return imc
}

/*funcion que muestra el resultado de su respectivo IMC  */
function mostrarResultados(imc){
    if(imc<18.5){
        alert("el estado de su IMC(indice de masa corporal) es de: "+imc+"\nestado: bajo \ndebes aumentar tu masa muscular")
    }else if(imc>=18.5 && imc<=24.9){
        alert("el estado de su IMC(indice de masa corporal) es de: " +imc+"\nestado: normal \n¡FELICITACIONES, estas en un estado saludable!")
    }else if(imc>=25 && imc<=29.9){
        alert("el estado de su IMC(indice de masa corporal) es de: "+imc+"\nestado: sobrepeso \ndebes adoptar una dieta")
    }else{
        alert("el estado de su IMC(indice de masa corporal) es de"+imc+"\nestado: obecidad \ndebes adoptar una dieta y una rutina de ejercicios")
    }
}