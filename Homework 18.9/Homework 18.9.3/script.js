function randomTime() {
  return Math.floor(Math.random() * 3000) + 2000; // 2–5 сек
}

// универсальный progress bar
function progress(time, barEl, timerEl) {
  barEl.style.transition = 'none';
  barEl.style.transform = 'scaleX(0)';
  timerEl.textContent = '0 c';

  let passed = 0;

  const interval = setInterval(() => {
    passed++;
    timerEl.textContent = passed + ' c';
    if (passed >= time) clearInterval(interval);
  }, 1000);

  requestAnimationFrame(() => {
    barEl.style.transition = `transform ${time}s linear`;
    barEl.style.transform = 'scaleX(1)';
  });
}

// имитация загрузки изображений
function fakeRequest(images, time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(images), time * 1000);
  });
}

function renderImages(container, images) {
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    container.appendChild(img);
  });
}

window.addEventListener('load', () => {
  const catsTime = randomTime() / 1000;
  const dogsTime = randomTime() / 1000;

  progress(
    catsTime,
    document.getElementById('bar-cats'),
    document.getElementById('timer-cats')
  );

  progress(
    dogsTime,
    document.getElementById('bar-dogs'),
    document.getElementById('timer-dogs')
  );

  fakeRequest(
    ['images/cat1.jpg', 'images/cat2.jpg', 'images/cat3.jpg'],
    catsTime
  ).then(images => {
    renderImages(document.getElementById('cats'), images);
  });

  fakeRequest(
    ['images/dog1.jpg', 'images/dog2.jpg', 'images/dog3.jpg'],
    dogsTime
  ).then(images => {
    renderImages(document.getElementById('dogs'), images);
  });
});
