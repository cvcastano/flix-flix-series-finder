'use strict';

const showName = document.querySelector('.js-filter').value;

let shows = [];
let images = [];

function fetchApiData() {
    fetch(`http://api.tvmaze.com/search/shows?q=${'game'}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
       shows = data;

      });
  }
  fetchApiData ();
