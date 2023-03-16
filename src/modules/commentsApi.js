export default async function postComment(item_id, username, comment) {
    try {
      const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/gLJ1Gx5WI5rhx6SowEsm/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  