let arrayPasado= []
let today = Date.now()
let events = data.events
// Funcion de Filtrado past
function filtrarEventos(parametroArray){
    for(let event of parametroArray){
        if(Date.parse(data.currentDate) > Date.parse(event.date)){
            arrayPasado.push(event)
        }
    }
}
filtrarEventos(events)

// Funcion para agregar info y contador.
let cardContador = 0;
function addInfo(arrayFiltrado){
    let template= '';
        for(let event of arrayFiltrado){
            cardContador++;
            template += `<div class="card _fondo" style="width: 18rem;">
            <i class="favorite btn position-absolute top-0 end-0 bi bi-heart-fill" id="like"></i>
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

// Función para marcar eventos favoritos
let favButtons = document.querySelectorAll('.favorite');
favButtons.forEach(function (button) {
      button.addEventListener('click', function () {
          this.classList.toggle('like');
      });
  });
  

const $catContainer = document.getElementById('catContainer');
// Función para crear categorias filtradas
let option = 0;
function createCats(array) {
    let templateCats = "";
    for (let i = 0; i < array.length; i++) {
        const nameCat = array[i];
        option++;
        templateCats += generateTemplateCat(nameCat);
    }
    $catContainer.innerHTML = templateCats;
}

// Filtro para eliminar categorias repetidas
let cat = [];
const categories = events.filter(element => {
    const isDuplicate = cat.includes(element.category);
    if (!isDuplicate) {
        cat.push(element.category);
        return true;
    }
    return false;
});

// Función para crear el template de las categorias
function generateTemplateCat(event) {
    return `
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${option}" value="${option}">
        <label class="form-check-label" for="${option}">${event}</label>
    </div>`
}
createCats(cat);