//Variables globales
let puntosEcologicos = [
    {
        piso: "3",
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0
    },

    {
        piso: "4",
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0
    },

    {
        piso: "5",
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0
    }
]

let tipoCanecaAgregar = "";

//Selectores 
const selectPiso = document.getElementById("select_floor");
const canecas = document.querySelectorAll('.bowl');
const btnAgregar = document.getElementById("btnSubmit")
const puntosEcologicosStorage = JSON.parse(localStorage.getItem("puntosEcologicosStorage"))


//Eventos y escuchadores 
canecas.forEach(caneca => {
    caneca.addEventListener("click", (event) => {
        console.log(event.target)
        //1.Abrir el boton modal
        //.click() lo que hace es que obligamos al puntero del usuario a que dé click donde queremos, es decir, 
        //teniendo el botón oculto en la parte donde le agregemos el evento es como si el botón estuviese visible y le hubiesen dado click ahí
        document.getElementById("btnOpenModal").click()
        //2. Obtener el tipo de caneca cuando le este dando clic
        //se optiene con el atributo perzonalizado 

        tipoCanecaAgregar = caneca.getAttribute("type-bowl")
        console.log(tipoCanecaAgregar);
    })
});

btnAgregar.addEventListener("click", () => {
    const cantidad = document.getElementById("cantidad").value

    //Agregar la candidad de desechos en su respectivo punto ecologico 

    puntosEcologicos.forEach(puntoEcologico => {
        //1.2. Encontrar el piso al que el usuario agrego la basura y despues sumar los desechos que estaban mas las nuevos 
        if (puntoEcologico.piso == selectPiso.value) {
            //1.3 Sumar los desechos que estaban + los nuevos 
            puntoEcologico[tipoCanecaAgregar] += parseInt(cantidad)

            localStorage.setItem("puntosEcologicosStorage", JSON.stringify(puntosEcologicos))
        }
    })

    document.querySelector("#formulario").reset()

    pintarContador()
    pintarFondo()
})

selectPiso.addEventListener("change", () => {
    pintarContador()
    pintarFondo()
})


document.addEventListener("DOMContentLoaded", () => {
    if (puntosEcologicosStorage) {
        puntosEcologicos = puntosEcologicosStorage
    }
    pintarContador()
    pintarFondo()
})


//Funciones
const pintarContador = () => {
    //1. Recorrer la lista de puntos ecologicos 

    const contadores = document.querySelectorAll(".body_top span")
    const puntoEcologico = puntosEcologicos.find((puntoEcolgicos) => puntoEcolgicos.piso == selectPiso.value)

    contadores[0].textContent = `${puntoEcologico.aprovechables} /500`
    contadores[1].textContent = `${puntoEcologico.organicos} /500`
    contadores[2].textContent = `${puntoEcologico.no_aprovechables} /500`

}

const pintarFondo = () => {
    const body = document.querySelector("body")
    const{no_aprovechables , aprovechables , organicos} = puntosEcologicos.find((puntoEcolgicos) => puntoEcolgicos.piso == selectPiso.value)

    let promedio = ((aprovechables + no_aprovechables + organicos)*(100))/1500
    
    console.log(promedio);


    if (promedio < 25) {
        body.style.background = "red"
    } else if (promedio > 25 && promedio < 50) {
        body.style.background = "yellow"

    } else {
        body.style.background = "green"
    }

}

