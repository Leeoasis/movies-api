export class TvShow {
    static async getTvShows() {
      try {
        const commentsButtons = document.querySelectorAll('.comments-button');
        commentsButtons.forEach((button) => {
          button.addEventListener('click', async () => {
            const showId = button.dataset.show;
            const show = await TvShow.getShowById(showId);
            const modal = document.getElementById('comments-modal');
            modal.style.display = 'block';
  
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = '';
  
            const commentsHeading = document.createElement('h2');
            commentsHeading.innerText = 'Comments';
            commentsContainer.appendChild(commentsHeading);
  
            commentsContainer.innerHTML += `
              <img src="${show.image.medium}">
              <h2>${show.name}</h2>
              <p>Language: ${show.language}</p>
              <p>Premiered: ${show.premiered}</p>
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
              const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/gLJ1Gx5WI5rhx6SowEsm/comments/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "user": name,
                  "body": comment,
                  "commentable_type": "Show",
                  "commentable_id": showId
                })
              });
  
              if (!response.ok) {
                throw new Error(`Error posting comment: ${response.statusText}`);
              }
  
              // Create the comment element and add it to the comments container
              const commentElement = TvShow.createCommentElement(name, comment);
              commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
  
              // Reset the comment form
              document.getElementById('comment-form').reset();
            });
  
            // Call the Involvement API to get the comments for the show
            const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/gLJ1Gx5WI5rhx6SowEsm/comments?item_id=${showId}`);
            const comments = await response.json();
  
            // Create the comment elements and add them to the comments container
            comments.forEach((comment) => {
              const commentElement = TvShow.createCommentElement(comment.user, comment.body);
              commentsContainer.appendChild(commentElement);
            });
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    static createCommentElement(username, comment) {
      const commentElement = document.createElement('div');
      commentElement.innerHTML = `<strong>${username}</strong>: ${comment} `;
      return commentElement;
    }
  
    static async getShowById(showId) {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const show = await response.json();
        return show;
      } catch (error) {
        console.error(error);
      }
    }
  }
  