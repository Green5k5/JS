function getRandomDelay() {
  return Math.floor(Math.random() * 3000) + 2000; // 2000–5000 мс
}

// Функция "запроса" котиков
function loadCatImages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        'images/cat1.jpg',
        'images/cat2.jpg',
        'images/cat3.jpg'
      ]);
    }, getRandomDelay());
  });
}

// Функция "запроса" собачек
function loadDogImages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        'images/dog1.jpg',
        'images/dog2.jpg',
        'images/dog3.jpg'
      ]);
    }, getRandomDelay());
  });
}

function renderImages(images) {
  const row = document.createElement('div');
  row.classList.add('row');

  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    row.appendChild(img);
  });

  document.getElementById('container').appendChild(row);
}



// Вызов при загрузке страницы
window.addEventListener('load', () => {
  loadCatImages().then(renderImages);
  loadDogImages().then(renderImages);
});
