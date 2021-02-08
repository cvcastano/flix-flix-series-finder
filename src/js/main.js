'use strict';

const inputElement = document.querySelector('.js-filter');
const showsContainer = document.querySelector('.js-shows');
const buttonElement = document.querySelector('.js-search-button');
const formElement = document.querySelector('.js-form');


let shows = [];

function handleInput(ev) {
    ev.preventDefault();
   
    console.log(inputElement.value);
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
        htmlCode += `<li class="js-show">`;
        htmlCode += `<h4 class="js-show-name">${shows[i].show.name}</h4>`
        htmlCode += `<img src="" alt="poster of the show ${shows[i].show.name}" class="js-show-img"/>`;
        htmlCode += `</li>`;

    }

    showsContainer.innerHTML = htmlCode;
}










// handleInput();




