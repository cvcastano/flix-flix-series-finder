'use strict';

'use strict';
const inputElement = document.querySelector('.js-filter');
const showsContainer = document.querySelector('.js-shows');
const formElement = document.querySelector('.js-form');
const favoritesContainer = document.querySelector('.js-favorites');

let shows = [];
let favorites = [];

// escucha en el input y llama al Api
function handleInput(ev) {
    ev.preventDefault();
    fetchApiData();
}
formElement.addEventListener('submit', handleInput);

// recoge del api y llama a pintar series                                                
function fetchApiData() {
    fetch(`http://api.tvmaze.com/search/shows?q=${inputElement.value}`)
        .then(response => response.json())
        .then(data => {
            shows = data;
            renderShows();
        });
}

// pinta series y llama a escuchar favoritos
function renderShows() {
    let htmlCode = '';
    for (let i = 0; i < shows.length; i++) {
        let id = shows[i].show.id;
        let name = shows[i].show.name;
        let image = shows[i].show.image;
        htmlCode += `<li class="card js-card" id="${id}">`;
        htmlCode += `<h4 class="js-show-name">${name}</h4>`;
        if (image === null) {
            htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
            text=TV" alt="no image available" class="js-show-img"/>`;
        } else {
            htmlCode += `<img src="${image.medium}"alt="Poster of '${name}'" class="js-show-img"/>`;
        }
        htmlCode += `</li>`;
    }
    showsContainer.innerHTML = htmlCode;
    listenFavorites();

}

// escucha favoritos
function listenFavorites() {
    const showCards = document.querySelectorAll('.js-card');
    for (const showCard of showCards) {
        showCard.addEventListener('click', handleCards);
    }
}

// maneja las tarjetas para saber cuál clickamos como favorita y llama a almacenarlas  
function handleCards(ev) {
    const clickedCardId = parseInt(ev.currentTarget.id);
    const clickedCard = shows.find(show => clickedCardId === show.show.id);
    const isFav = favorites.findIndex(show => clickedCardId === show.show.id);
    if (isFav === -1) {
        favorites.push(clickedCard);
    } else {
        favorites.splice(isFav, 1);
    }
    storeFavorites();
}

// hace string los favoritos para poder almacenarlos y llama a pintarlos
function storeFavorites() {
    const stringFavorites = JSON.stringify(favorites);
    localStorage.setItem('favorites', stringFavorites);

    renderFavorites();
}

// recoge los favoritos del local storage y llama a pintarlos  
function fetchFavorites() {
    const localStorageFavorites = localStorage.getItem('favorites');
    if (localStorageFavorites) {
        const arrayFavorites = JSON.parse(localStorageFavorites);
         favorites = arrayFavorites;
         renderFavorites();
    } else {
        fetchApiData ();
    }  
}

// pinta favoritos y llama a escuchar favoritos
function renderFavorites() {
    let htmlCodeFav = '';
    for (let i = 0; i < favorites.length; i++) {
        let id = favorites[i].show.id;
        let name = favorites[i].show.name;
        let image = favorites[i].show.image;
        htmlCodeFav += `<li class="fav-card js-fav-card" id="${id}">`;
        htmlCodeFav += `<h4 class="js-fav-name">${name}</h4>`;
        if (image === null) {
            htmlCodeFav += `<img src="https://via.placeholder.com/105x150/ffffff/666666/?
            text=TV" alt="no image available" class="js-show-img"/>`;
        } else {
            htmlCodeFav += `<img class="fav-img" src="${image.medium}"`;
        }
        htmlCodeFav += `</li>`;
    }
    favoritesContainer.innerHTML = htmlCodeFav;
    listenFavorites();
}

fetchFavorites();



