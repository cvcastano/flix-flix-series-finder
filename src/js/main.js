'use strict';

const inputElement = document.querySelector('.js-filter');
const showsContainer = document.querySelector('.js-shows');


let shows = [];

function fetchApiData() {
    fetch(`http://api.tvmaze.com/search/shows?q=${'game'}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            shows = data;

            renderShows();
        });
}
function renderShows () {
    let htmlCode = '';
    for (let i = 0; i < shows.length; i++) {
        htmlCode += `<li class="js-show">`;
        htmlCode += `<h4 class="js-show-name">${shows[i].show.name}</h4>`
        htmlCode += `<img src="" alt="poster of the show ${shows[i].show.name}" class="js-show-img"/>`;
        htmlCode += `</li>`;
    
    }

    showsContainer.innerHTML = htmlCode;
}
    
function handleFilter () {
    

}

inputElement.addEventListener('keyup', handleFilter)

fetchApiData();


