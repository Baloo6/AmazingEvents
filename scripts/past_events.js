let arrayPasado= []
let today = Date.now()
let dataEvents = data.events
// Funcion de Filtrado past
function filtrarEventos(parametroArray){
    for(let event of parametroArray){
        if(Date.parse(data.currentDate) > Date.parse(event.date)){
            arrayPasado.push(event)
        }
    }
}
filtrarEventos(dataEvents)

// Funcion para agregar info y contador.
let cardContador = 0;
function addInfo(arrayFiltrado){
    let template= '';
        for(let event of arrayFiltrado){
            cardContador++;
            template += `<div class="card _fondo" style="width: 18rem;">
            <img src="${event.image}" class="card-img-top" alt="event cinema">
            <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="detail-btn">
                <p>Price:${event.price}</p>
                <a href="details.html" class="btn btn-detail">Details</a>
            </div> 
            </div>
        </div>`
    } 
    return template
}

/* Agregar las cards/contador obtenidas por la funcion e inyectarlas en el HTML */
let estructuraCard = addInfo(arrayPasado);
let cardsDinamicas = document.getElementById('cards_div')
cardsDinamicas.innerHTML += estructuraCard

let contadorCards = `<h3> Total events: ${cardContador} </h3>`
let categoriesDiv = document.getElementById('categories_div')
categoriesDiv.innerHTML += contadorCards