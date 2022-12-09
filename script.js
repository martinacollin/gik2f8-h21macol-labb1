'use strict';

let bookList = [];
let bookModal;

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

const rootElement = document.getElementById('root');
rootElement.addEventListener('mouseover', (event) => {
  const bookId = +event.target.dataset.bookId;
  if (bookId > 0) {
    if (!bookModal) {
      renderBookModal();
    }
    showModal(event);
  } else {
    hideModal();
  }
})

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  const root = document.getElementById('root');

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));
}

function renderBookModal() {
  //<div id="bookDetails"
  //     className="book-details absolute p-3 rounded-md border-2 border-blue-400 bg-white"
  //     style="display: none">
  //</div>
  const modal = document.createElement('div');
  modal.id = 'bookDetails';
  modal.className = 'book-details absolute p-3 rounded-md border-2 border-blue-400 bg-white';
  modal.style.display = 'none';

  const root = document.getElementById('root');
  root.appendChild(modal);

  bookModal = modal;
}

function showModal(event) {
  bookModal.innerText = '';
  bookModal.style.display = 'block';
  bookModal.style.left = event.clientX + 'px';
  bookModal.style.top = event.clientY + 'px';
}

function hideModal() {
  if (!bookModal) {
    return;
  }
  bookModal.innerText = '';
  bookModal.style.display = 'none';
}
