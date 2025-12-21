const studentsGrowthsContainer = document.getElementById('students-growths');
const addStudentBtn = document.getElementById('add-student-btn');
const filterGrowthBtn = document.getElementById('filter-growth-btn');

let studentHeights = [165, 170, 180, 160];

function renderStudentsGrowths() {
    studentsGrowthsContainer.innerHTML = '';
    studentHeights.forEach(height => {
        const heightDiv = document.createElement('div');
        heightDiv.textContent = `${height} см`;
        studentsGrowthsContainer.appendChild(heightDiv);
    });
}

renderStudentsGrowths();

addStudentBtn.addEventListener('click', () => {
    const inputHeight = prompt('Введите рост ученика:');
    if (!inputHeight || isNaN(inputHeight)) {
        alert('Рост не введен!');
        return;
    }
    studentHeights.push(Number(inputHeight));
    renderStudentsGrowths();
});

filterGrowthBtn.addEventListener('click', () => {
    const filterHeight = prompt('Введите минимальный рост для фильтрации:');
    if (!filterHeight || isNaN(filterHeight)) {
        renderStudentsGrowths(); // Показать полный список
        return;
    }
    const filteredHeights = studentHeights.filter(h => h >= Number(filterHeight));
    renderStudentsGrowths(filteredHeights);
});