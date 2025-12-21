document.addEventListener('DOMContentLoaded', () => {
    const filmsTableBody = document.querySelector('#films-table tbody');
    const filmForm = document.getElementById('film-form');
    const sortBySelect = document.getElementById('sort-by');

    loadFilmsFromLocalStorage();

    filmForm.addEventListener('submit', handleAddFilm);
    sortBySelect.addEventListener('change', handleSortFilms);

    function loadFilmsFromLocalStorage() {
        const storedFilmsJSON = localStorage.getItem('films');
        if(storedFilmsJSON !== null) {
            const films = JSON.parse(storedFilmsJSON);
            updateTable(films);
        }
    }

    function updateTable(films) {
        filmsTableBody.innerHTML = '';
        films.forEach((film, index) => {
            const tr = document.createElement('tr');
            tr.dataset.index = index;
            tr.innerHTML = `
                <td>${film.title}</td>
                <td>${film.genre}</td>
                <td>${film.year}</td>
                <td>
                    <button data-action="edit">Редактировать</button>
                    <button data-action="delete">Удалить</button>
                </td>
            `;
            filmsTableBody.appendChild(tr);
        });
    }

    function handleAddFilm(e) {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const genre = document.getElementById('genre').value.trim();
        const year = document.getElementById('year').value.trim();

        if(!title || !genre || !year) {
            alert('Заполните все поля!');
            return;
        }

        const films = getFilmsFromLocalStorage();
        films.push({ title, genre, year });
        saveFilmsToLocalStorage(films);
        updateTable(films);
        clearForm();
    }

    function handleEdit(index) {
        const films = getFilmsFromLocalStorage();
        const filmToEdit = films[index];
        document.getElementById('title').value = filmToEdit.title;
        document.getElementById('genre').value = filmToEdit.genre;
        document.getElementById('year').value = filmToEdit.year;
        films.splice(index, 1);
        saveFilmsToLocalStorage(films);
        updateTable(films);
    }

    function handleDelete(index) {
        const films = getFilmsFromLocalStorage();
        films.splice(index, 1);
        saveFilmsToLocalStorage(films);
        updateTable(films);
    }

    function handleSortFilms() {
        const sortKey = this.value;
        const films = getFilmsFromLocalStorage();
        if(sortKey) {
            films.sort((a, b) => {
                if(a[sortKey] < b[sortKey]) return -1;
                if(a[sortKey] > b[sortKey]) return 1;
                return 0;
            });
        }
        updateTable(films);
    }

    function getFilmsFromLocalStorage() {
        const storedFilmsJSON = localStorage.getItem('films');
        return storedFilmsJSON ? JSON.parse(storedFilmsJSON) : [];
    }

    function saveFilmsToLocalStorage(films) {
        localStorage.setItem('films', JSON.stringify(films));
    }

    function clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('genre').value = '';
        document.getElementById('year').value = '';
    }

    filmsTableBody.addEventListener('click', (event) => {
        if(event.target.dataset.action === 'edit') {
            const index = event.target.closest('tr').dataset.index;
            handleEdit(parseInt(index));
        } else if(event.target.dataset.action === 'delete') {
            const index = event.target.closest('tr').dataset.index;
            handleDelete(parseInt(index));
        }
    });
});