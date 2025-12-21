function globalError() {
  const error = Error('Глобальная ошибка');
  error.name = 'GlobalError'; // задаём специальное имя ошибки
  throw error;
}

function localError() {
  const error = Error('Локальная ошибка');
  error.name = 'LocalError'; // задаём специальное имя ошибки
  throw error;
}

function testErrorScope(fn) {
  try {
    try {
      fn();
    } catch (error) {
      if (error.name === 'LocalError') {
        console.log('Обнаружена локальная ошибка');
        console.error(error);
      } else {
        throw error; // переходим к внешнему catch
      }
    }
  } catch (error) {
    console.log('Обнаружена глобальная ошибка');
    console.error(error);
  }
}

testErrorScope(localError);
testErrorScope(globalError);