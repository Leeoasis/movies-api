
test('should fetch and parse movies from API', async () => {
  const getData = await fetch('https://api.tvmaze.com/search/shows?q=games');
  const request = await getData.json();
  const movieArray = Array.from(request);

  expect(movieArray).toHaveLength(10); //GAMES API RETURN 10 MOVIE ITEMS
  expect(movieArray[1]).toHaveProperty('show.name');
  expect(movieArray[9]).toHaveProperty('show.image.medium');
});
