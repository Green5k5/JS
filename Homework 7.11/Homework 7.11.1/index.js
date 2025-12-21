const booksContainer = document.getElementById('books-container');
const addBookBtn = document.getElementById('add-book-btn');
const searchBookBtn = document.getElementById('search-book-btn');

let libraryBooks = ['Война и мир', 'Преступление и наказание'];

function renderBooks() {
    booksContainer.innerHTML = '';
    libraryBooks.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.textContent = book;
        booksContainer.appendChild(bookDiv);
    });
}

renderBooks();

addBookBtn.addEventListener('click', () => {
    const title = prompt('Введите название книги:');
    if (!title.trim()) {
        alert('Название книги не введено!');
        return;
    }
    libraryBooks.push(title);
    renderBooks();
});

searchBookBtn.addEventListener('click', () => {
    const targetTitle = prompt('Введите название книги для поиска:');
    const foundBook = libraryBooks.find(book => book === targetTitle);
    if (foundBook) {
        const foundBookElem = Array.from(document.querySelectorAll('.book')).find(elem => elem.textContent === foundBook);
        foundBookElem.classList.add('book-found');
    } else {
        alert('Книга не найдена!');
    }
});