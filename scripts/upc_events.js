let arrayPasado= []
let today = Date.now()
let events = data.events
const arrayData = data.events
const $contenedorChecks = document.getElementById('catContainer')
const $containerCards = document.getElementById('cards_div')
// Funcion de Filtrado up
function filtrarEventos(parametroArray){
    for(let event of parametroArray){
        if(Date.parse(data.currentDate) < Date.parse(event.date)){
            arrayPasado.push(event)
        }
    }
}
filtrarEventos(events)


// Creamos la categorias sin repetir para los checks
const cat_array = [...new Set(arrayPasado.map(objeto => objeto.category))];

// Crear checks
function crearChecks(string) {
     let template = ""
     return template = `
     <label class="me-2">
          <input type="checkbox" class="me-2" name="check" value="${string}">${string}
     </label>
     `
}

// Imprimir checks
function imprimirChecks(array, elementoHTML) {
     let estructura = ""
     array.forEach(string => {
          estructura += crearChecks(string)
     })
     elementoHTML.innerHTML += estructura
}
imprimirChecks(cat_array, $contenedorChecks)



// Crear Cards
function crearCard(arrayPasado) {
     let template = ""
     return template = `
        <div class="card _fondo" style="width: 18rem;">
            <i class="favorite btn position-absolute top-0 end-0 bi bi-heart-fill" id="like"></i>
            <img src="${arrayPasado.image}" class="card-img-top" alt="event cinema">
            <div class="card-body">
                  <h5 class="card-title">${arrayPasado.name}</h5>
                  <p class="card-text">${arrayPasado.description}</p>
            </div>
            <div class="detail-btn">
                    <p>Price:${arrayPasado.price}</p>
                    <a href="details.html" class="btn btn-detail">Details</a>
            </div> 
            
        </div>
     `
}

// Fn imprimir cards
function imprimirCards(array, elementoHTML) {
          let estructura = ""
          array.forEach(string => {
               estructura += crearCard(string)
          })
          elementoHTML.innerHTML = estructura
}
imprimirCards(arrayPasado, $containerCards)

// Función para marcar eventos favoritos
let favButtons = document.querySelectorAll('.favorite');
favButtons.forEach(function (button) {
      button.addEventListener('click', function () {
          this.classList.toggle('like');
      });
  });
  

// Checks
$contenedorChecks.addEventListener("change", (e) => {
    const return_filtros = fn_filtros(arrayPasado, $search)
    imprimirCards(return_filtros, $containerCards)
})

function filtroChecks(array){
    let arrayValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
    if (arrayValues.length != 0){
        let arrayChecks = array.filter(objeto => arrayValues.includes(objeto.category))
        return arrayChecks
    } else {return arrayPasado}
    
}


//Search
const $search = document.querySelector('input[type="search"]')

$search.addEventListener( "keyup", ()=>{
    const return_filtros = fn_filtros(arrayPasado, $search)
    imprimirCards(return_filtros, $containerCards)
})

function filtroSearch(array, input){
    let arraySearch = array.filter(objeto => objeto.name.toLowerCase().includes(input.value.toLowerCase()))
    console.log(arraySearch);
    return arraySearch
}

//Juntar filtros
function fn_filtros(array, input){
    const af_check = filtroChecks(array)
    const af_search = filtroSearch(af_check, input)
    return af_search
}