'use strict';

const inputElement = document.querySelector('.js-filter');
const showsContainer = document.querySelector('.js-shows');
const formElement = document.querySelector('.js-form');

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
            console.log(data);
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
            htmlCode += `<img src="${image.medium}"`;
        }
        htmlCode += `</li>`;
    }
    showsContainer.innerHTML = htmlCode;
    listenFavorites();


}

function handleCards(ev) {
    const clickedCard = ev.currentTarget;
     console.log('me han clickado', clickedCard);
    favorites.push(clickedCard);
    console.log(favorites);

    const stringFavorites = favorites;
    localStorage.setItem('favorites', stringFavorites);
}

function listenFavorites() {
    const showCards = document.querySelectorAll('.js-card');
    for (const showCard of showCards) {
        showCard.addEventListener('click', handleCards);
   }
}


