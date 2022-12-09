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
  if (event.target.id === 'bookDetails' || 
      event.target.className.includes('book-details') ||
      event.target.tagName === 'STRONG') {
    return;
  }
  const bookId = +event.target.dataset.bookId;
  if (bookId > 0) {
    if (!bookModal) {
      renderBookModal();
    }

    getById(bookId).then(apiBook => {
      bookModal.innerText = '';
      bookModal.insertAdjacentHTML('beforeend', BookDetails(apiBook));
      showModal(event);
    });
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
  //     className="absolute p-3 rounded-md border-2 border-blue-400 bg-emerald-200"
  //     style="display: none">
  //</div>
  const modal = document.createElement('div');
  modal.id = 'bookDetails';
  modal.className = 'absolute p-3 rounded-md border-2 border-blue-400 bg-emerald-200';
  modal.style.display = 'none';

  const root = document.getElementById('root');
  root.appendChild(modal);

  bookModal = modal;
}

function showModal(event) {
  bookModal.style.display = 'block';
  bookModal.style.left = event.clientX + 'px';
  bookModal.style.top = event.clientY + 'px';
}

function hideModal() {
  if (!bookModal) {
    return;
  }
  bookModal.style.display = 'none';
}
