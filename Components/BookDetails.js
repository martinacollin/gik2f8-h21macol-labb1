const BookDetails = (book) => {
    let html = `<div class="book-details__body ">
                  <h2 class="book-details__title text-lg font-bold">${book.title}</h2>
                  <p class="book-details__author">
                    <strong>Författare:</strong> ${book.author}
                  </p>
                  <p class="book-details__release-date">
                    <strong>Utgivningsår:</strong> ${book.releaseDate}
                  </p>
                  <p class="book-details__pages">
                    <strong>Sidor:</strong> ${book.pages}
                  </p>`;
    if (book.coverImage) {
        html += `<img src="${book.coverImage}" alt="Omslagsbild" class="book-details__cover max-w-xs mt-3">`;
    }
    html += '</div>';
    return html;
};