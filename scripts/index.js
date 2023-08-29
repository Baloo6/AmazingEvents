let template= ''

for(let event of data.events){
    template += `<div class="card" style="width: 18rem;">
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