const callingLikes = async () => {
  const holder = document.querySelector('.like-tank');
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/smiwv0zCAderK76mG4qH/likes';
  const api = await fetch(url, { method: 'GET' });
  const response = await api.json();
  const convert = Array.from(response);
  const likes = convert.map((like) => {
    return {
      id: like.item_id,
      likes: like.likes
    };
  });
  return likes;
};

(async () => {
  //const likes = await callingLikes();
  //likes.forEach((like) => {
   // console.log(`ID: ${like.id}, Likes: ${like.likes}`);
  //});
})();
export default callingLikes;
