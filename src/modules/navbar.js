const navBar = document.querySelector('#contents');

export const nav = async () => {
  const getData = await fetch('https://api.tvmaze.com/search/shows?q=games');
  const request = await getData.json();
  const movieArray = Array.from(request);
  const counter = movieArray.length;

  // Generating number of moviez to navigation bar
  const movvieItems = `<div class="col-2" id="logo" href="index.html"><img
src="https://png.pngtree.com/png-clipart/20200826/original/pngtree-movie-logo-movie-letter-v-png-image_5469427.jpg"
alt="logo"></div>
<div class="col-3"><a href="index.html">Moviez(${counter})</a></div>
<div class="col-3">Planets</div>
<div class="col-3">Races</div>`;
  navBar.innerHTML = movvieItems;
};

export default nav;
