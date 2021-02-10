'use strict';

'use strict';
const inputElement = document.querySelector('.js-filter');
const showsContainer = document.querySelector('.js-shows');
const formElement = document.querySelector('.js-form');
const favoritesContainer = document.querySelector('.js-favorites');

let shows = [];
let favorites = [];

function handleInput(ev) {
    ev.preventDefault();
    fetchApiData();
}
formElement.addEventListener('submit', handleInput);

function fetchApiData() {
    fetch(`http://api.tvmaze.com/search/shows?q=${inputElement.value}`)
        .then(response => response.json())
        .then(data => {
            shows = data;
            renderShows();
        });
}

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
    listenShows();

}

function listenShows() {
    const showCards = document.querySelectorAll('.js-card');
    for (const showCard of showCards) {
        showCard.addEventListener('click', handleCards);
        showCard.addEventListener('click', clickedCard);
    }
}

function clickedCard(ev) {
    let clickedCardElement = event.currentTarget;
    clickedCardElement.classList.toggle('clicked-card');
}

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

function storeFavorites() {
    const stringFavorites = JSON.stringify(favorites);
    localStorage.setItem('favorites', stringFavorites);

    renderFavorites();
}

function fetchFavorites() {
    const localStorageFavorites = localStorage.getItem('favorites');
    if (localStorageFavorites) {
        const arrayFavorites = JSON.parse(localStorageFavorites);
        favorites = arrayFavorites;
        renderFavorites();
    } else {
        listenShows();
    }
}

function renderFavorites() {
    let htmlCodeFav = '';
    for (let i = 0; i < favorites.length; i++) {
        let id = favorites[i].show.id;
        let name = favorites[i].show.name;
        let image = favorites[i].show.image;
        htmlCodeFav += `<li class="fav-card js-fav-card" id="${id}">`;
        htmlCodeFav += `<h4 class="js-fav-name">${name}</h4>`;
        if (image === null) {
            htmlCodeFav += `<img src="https://via.placeholder.com/55x75/ffffff/666666/?
            text=TV" alt="no image available" class="js-show-img"/>`;
        } else {
            htmlCodeFav += `<img class="fav-img" src="${image.medium}"`;
        }
        htmlCodeFav += `</li>`;
    }
    favoritesContainer.innerHTML = htmlCodeFav;
    listenShows();
}

fetchFavorites();



