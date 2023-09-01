let template= ''
let cardContador= 0;
for(let event of data.events){
    cardContador++ ;
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

let cardsDinamicas = document.getElementById('cards_div')
cardsDinamicas.innerHTML += template

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
