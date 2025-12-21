function progress(time) {
  if (time < 2) time = 2;

  const bar = document.getElementById('progress-bar');
  const timer = document.getElementById('timer');

  // сброс
  bar.style.transition = 'none';
  bar.style.transform = 'scaleX(0)';
  timer.textContent = '0 c';

  let secondsPassed = 0;

  // таймер секунд
  const interval = setInterval(() => {
    secondsPassed++;
    timer.textContent = secondsPassed + ' c';

    if (secondsPassed >= time) {
      clearInterval(interval);
    }
  }, 1000);

  // запуск анимации (через reflow)
  requestAnimationFrame(() => {
    bar.style.transition = `transform ${time}s linear`;
    bar.style.transform = 'scaleX(1)';
  });
}
