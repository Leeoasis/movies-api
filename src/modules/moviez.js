import involvmentApi from './involvment.js';
import callingLikes from './likes.js';
import { nav } from './navbar.js';
import { TvShow } from './popup.js';
import { initModal } from './modal.js'
involvmentApi();
nav();

export const showMoviez = async () => {
    const holder = document.querySelector('#moviz');

    const getData = await fetch('https://api.tvmaze.com/search/shows?q=games');
    const request = await getData.json();
    const movieArray = Array.from(request);
const movieHTML = movieArray.map(item => `
<div class="col-4" id="${item.show.id}">
  <div class="row">
    <div class="col-12">
      <img src="${item.show.image.medium}" alt="img1">
    </div>
    <div class="col-12" id="name-likes">
      <span>${item.show.name}</span>
    </div>
    <div class="col-12">
      <button class="btn btn-primary comments-button" data-show="${item.show.id}">Comments</button>
    </div>
  </div>
</div>
`);

// Getting likes and generating HTML for each like
const likes = await callingLikes();
const likesHTML = likes.map(like => `
  <span ${like.id}>
    <i class="fa fa-heart-o liked" data-itemid="${like.id}"></i> <br>
    <span class="like">${like.likes}</span>
  </span>
`);

holder.innerHTML = movieHTML.map((html, i) => html.replace('</div>', `${likesHTML[i]}</div>`)).join('');

// Fetching TV show data and generating HTML for comments and modal
await TvShow.getTvShows();
initModal();
};


