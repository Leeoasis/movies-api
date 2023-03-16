export function initModal() {
    let closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      let modal = document.getElementById('comments-modal');
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      let modal = document.getElementById('comments-modal');
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  }
  