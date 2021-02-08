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
        const id = shows[i].show.id;
        const name = shows[i].show.name;
        // const image = shows[i].show.image.medium;
        htmlCode += `<li class="card js-card" id="${id}">`;
        htmlCode += `<h4 class="js-show-name">${name}</h4>`;
        htmlCode += `<img src=" https://via.placeholder.com/100x100/ffffff/666666/?
        text=TV" alt="poster of the show '${name}'" class="js-show-img"/>`;
        htmlCode += `</li>`;
    }
    showsContainer.innerHTML = htmlCode;
    listenFavorites();
}

function handleCards() {
    console.log('me han clickado');
}

function listenFavorites() {
    const showCards = document.querySelectorAll('.js-card');
    for (const showCard of showCards) {
        showCard.addEventListener('click', handleCards);
    }
}


