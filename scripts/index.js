const $contenedorChecks = document.getElementById('catContainer')
const $containerCards = document.getElementById('cards_div')

async function fetchData() {

    try {
        const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
        const data = await respuesta.json();
        final(data);
    }
     
    catch {
        console.error('Error in try fetching');
    }
}
fetchData()

const final = (data)  => {
    const arrayData = data.events
    

        // Creamos la categorias sin repetir para los checks
        const cat_array = [...new Set(arrayData.map(objeto => objeto.category))]

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
        function crearCard(arrayData) {
            let template = ""
            return template = `
                <div class="card _fondo" style="width: 18rem;">
                    <i class="favorite btn position-absolute top-0 end-0 bi bi-heart-fill" id="like"></i>
                    <img src="${arrayData.image}" class="card-img-top" alt="event cinema">
                    <div class="card-body">
                        <h5 class="card-title">${arrayData.name}</h5>
                        <p class="card-text">${arrayData.description}</p>
                    </div>
                    <div class="detail-btn">
                            <p>Price:${arrayData.price}</p>
                            <a href="details.html?id=${arrayData._id}" class="btn btn-detail">Details</a>
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
        imprimirCards(arrayData, $containerCards)

        // Función para marcar eventos favoritos
        let favButtons = document.querySelectorAll('.favorite');
        favButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                this.classList.toggle('like');
            });
        });
        

        // Checks
        $contenedorChecks.addEventListener("change", (e) => {
            const return_filtros = fn_filtros(arrayData, $search)
            imprimirCards(return_filtros, $containerCards)
        })

        function filtroChecks(array){
            let arrayValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
            if (arrayValues.length != 0){
                let arrayChecks = array.filter(objeto => arrayValues.includes(objeto.category))
                return arrayChecks
            } else {return arrayData}
            
        }


        //Search
        const $search = document.querySelector('input[type="search"]')

        $search.addEventListener( "keyup", ()=>{
            const return_filtros = fn_filtros(arrayData, $search)
            imprimirCards(return_filtros, $containerCards)
        })

        function filtroSearch(array, input){
            let arraySearch = array.filter(objeto => objeto.name.toLowerCase().includes(input.value.toLowerCase()))
            return arraySearch
        }

        //Juntar
        function fn_filtros(array, input){
            const af_check = filtroChecks(array)
            const af_search = filtroSearch(af_check, input)
            return af_search
        }
    }
