export default function initModal() {
  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    const modal = document.getElementById('comments-modal');
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    const modal = document.getElementById('comments-modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}
