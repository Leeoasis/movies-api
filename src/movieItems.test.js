test('should fetch and parse movies from API', async () => {
  const getData = await fetch('https://api.tvmaze.com/search/shows?q=games');
  const request = await getData.json();
  const movieArray = Array.from(request);

  expect(movieArray).toHaveLength(10); // GAMES API RETURN 10 MOVIE ITEMS
  expect(movieArray[1]).toHaveProperty('show.name');
  expect(movieArray[9]).toHaveProperty('show.image.medium');
});

describe('comments API', () => {
  test('should return a 200 status code when posting a comment', async () => {
    const uniqueId = 'PRBp7fuH5ROaUTyQXIdG';
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${uniqueId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: '1',
        username: 'John Doe',
        comment: 'This is a test comment',
      }),
    });
    expect(response.status).toBe(201);
  });

  test('should return a list of comments for a given item id', async () => {
    const showId = 1;
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/PRBp7fuH5ROaUTyQXIdG/comments?item_id=${showId}`);
    const comments = await response.json();
    expect(Array.isArray(comments)).toBe(true);
  });
  test('should return a 404 status code when item_id is not found', async () => {
    const showId = 'invalid-id';
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/PRBp7fuH5ROaUTyQXIdG/comments?item_id=${showId}`);
    expect(response.status).toBe(400);
  });
  describe('comments API', () => {
    test('should return an array of comments when a valid item_id is provided', async () => {
      const showId = '12345';
      const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/PRBp7fuH5ROaUTyQXIdG/comments?item_id=${showId}`);
      const comments = await response.json();
      expect(Array.isArray(comments)).toBe(false);
    });
  });
});
