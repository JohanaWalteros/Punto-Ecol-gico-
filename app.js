const test = [
    {
        "aprovechables": 2,
        "organicos": 2,
        "no_aprovechables": 2,
        "piso": "3"
    },
    {
        "aprovechables": 100,
        "organicos": 400,
        "no_aprovechables": 223,
        "piso": "4"
    },
    {
        "aprovechables": 400,
        "organicos": 400,
        "no_aprovechables": 223,
        "piso": "5"
    },
]

let tipoCanecaAgregar;


// SELECTORES
const selectFloor = document.querySelector("#select_floor")
const canecas = document.querySelectorAll(".bowl")
const btnSubmit = document.querySelector("#btnSubmit")
const cantidad = document.querySelector("#cantidad")


// Eventos
document.addEventListener("DOMContentLoaded", () => {
    // localStorage.setItem("data_floor", JSON.stringify(test))
    loadingData()
})

selectFloor.addEventListener("input", loadingData)

btnSubmit.addEventListener("click", actualizarPuntoEcologico)


canecas.forEach(caneca => {
    caneca.addEventListener("click", () => {
        document.querySelector("#btnOpenModal").click();
        tipoCanecaAgregar = caneca.getAttribute("type-bowl")
    })
})

// Funciones
function actualizarPuntoEcologico() {
    let dataFloor = localStorage.getItem("data_floor");
    if (dataFloor) {
        dataFloor = JSON.parse(dataFloor);

        dataFloor.forEach(element => {
            if (element.piso == selectFloor.value) {
                element[tipoCanecaAgregar] += parseInt(cantidad.value)
            }
        });

        console.log(dataFloor)

        localStorage.setItem("data_floor", JSON.stringify(dataFloor))

        loadingData()
    }
}


function loadingData() {
    let dataFloor = localStorage.getItem("data_floor");

    if (dataFloor) {
        dataFloor = JSON.parse(dataFloor);
        showNumbersBowls(dataFloor)
    }
}


function showNumbersBowls(dataFloor) {

    dataFloor.forEach(element => {

        if (element.piso == selectFloor.value) {

            const aprovechable = document.querySelector("#aprovechables .body_top span")
            aprovechable.textContent = `${element.aprovechables}/500`

            const organicos = document.querySelector("#organicos .body_top span")
            organicos.textContent = `${element.organicos}/500`

            const no_aprovechables = document.querySelector("#no_aprovechables  .body_top span")
            no_aprovechables.textContent = `${element.no_aprovechables}/500`

            let punto_ecologico = element.aprovechables + element.organicos + element.no_aprovechables
            punto_ecologico = ((punto_ecologico * 100) / 1500)

            if (punto_ecologico < 25) {
                document.body.style.background = "red"
            }
            if (punto_ecologico >= 25 && punto_ecologico <= 50) {
                document.body.style.background = "orange"

            }

            if (punto_ecologico > 50) {
                document.body.style.background = "green"

            }
        }
    });
}