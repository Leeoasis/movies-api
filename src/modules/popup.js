export default class TvShow {
  static async getTvShows() {
    const commentsButtons = document.querySelectorAll('.comments-button');
    commentsButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const showId = button.dataset.show;
        const show = await TvShow.getShowById(showId);
        const modal = document.getElementById('comments-modal');
        modal.style.display = 'block';

        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';
        commentsContainer.innerHTML += `
          <img src="${show.image.medium}">
          <h2>${show.name}</h2>
          <p>Language: ${show.language}</p>
          <p>Premiered: ${show.premiered}</p>
          <h4>Comments(0)</h4>
          <div class="comments"></div>
          <form id="comment-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
            <label for="comment">Comment:</label>
            <textarea id="comment" name="comment"></textarea>
            <button type="submit">Submit</button>
          </form>
        `;

        const commentForm = document.getElementById('comment-form');
        commentForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const name = document.getElementById('name').value;
          const comment = document.getElementById('comment').value;

          // Call the Involvement API to post the comment
          const uniqueId = 'PRBp7fuH5ROaUTyQXIdG';
          const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
          const response = await fetch(`${baseUrl}/apps/${uniqueId}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              item_id: showId,
              username: name,
              comment,
            }),
          });

          if (!response.ok) {
            throw new Error(`Error posting comment: ${response.statusText}`);
          }

          // Create the comment element and add it to the comments container
          const commentElement = TvShow.createCommentElement(name, comment, 'A few moments ago');
          const comments = document.querySelector('.comments');
          comments.appendChild(commentElement);

          // Reset the comment form
          document.getElementById('comment-form').reset();
        });

        // Call the Involvement API to get the comments for the show
        const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
        const response = await fetch(`${url}/apps/PRBp7fuH5ROaUTyQXIdG/comments?item_id=${showId}`);
        let comments = await response.json();
        if (!comments.length) {
          comments = [];
        }

        // Create the comment elements and add them to the comments container
        comments.forEach((comment) => {
          const comments = document.querySelector('.comments');

          const commentElement = TvShow.createCommentElement(comment.username,
            comment.comment, comment.creation_date);
          comments.appendChild(commentElement);
          const counter = document.querySelectorAll('.comment-counter');
          document.querySelector('h4').textContent = `Comments (${counter.length})`;
        });
      });
    });
  }

  static createCommentElement(username, comment, creationDate) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-counter';
    commentElement.innerHTML = `${creationDate} <strong>${username}</strong>: ${comment} `;
    return commentElement;
  }

  static async getShowById(showId) {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
      const show = await response.json();
      return show;
    } catch (error) {
      return null;
    }
  }
}
