(() => {
  document.addEventListener('DOMContentLoaded', () => {
    initialGame();

    // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
    function createNumbersArray(count) {
      const cardsArray = [];
      for (let i = 1; i <= count; i++) {
        cardsArray.push(i, i);
      };
      return cardsArray;
    }

    // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
    function shuffle(arr) {
      for (let i = 0; i < arr.length; i++) {
        const j = Math.floor(Math.random() * arr.length);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }

    let firstCard = null;
    let secondCard = null;
    // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
    function startGame(count) {
      const array = shuffle(createNumbersArray(count)); // добавила
      const gameField = document.getElementById('game-field');
      for (const cardNumber of array) {
        const card = document.createElement('div');
        card.textContent = cardNumber;
        card.classList.add('card');
        card.addEventListener('click', function () {
          if (card.classList.contains('open') || card.classList.contains('match')) {
            return;
          }
          card.classList.add('open');
          if (firstCard !== null && secondCard !== null) {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            firstCard = null;
            secondCard = null;
          }

          if (firstCard === null) {
            firstCard = card;
          } else {
            secondCard = card;
          };

          if (firstCard !== null && secondCard !== null) {
            let firstCardNumber = firstCard.textContent;
            let secondCardNumber = secondCard.textContent;
            if (firstCardNumber === secondCardNumber) {
              firstCard.classList.add('match');
              secondCard.classList.add('match');
            }
          }
          const victoryButton = document.createElement('button');
          victoryButton.textContent = 'Сыграть еще раз';
          victoryButton.classList.add('btn');
          const btnWrapper = document.getElementById('btn-wrapper');
          if (array.length === document.querySelectorAll('.match').length) {
            btnWrapper.append(victoryButton);
          }
          victoryButton.addEventListener('click', () => {
            gameField.innerHTML = '';
            btnWrapper.innerHTML = '';
            initialGame();
          });
        })

        gameField.append(card);
      };
      timeOut(60000);
      return gameField;
    };

    //Этап 4. Создаем модальное окно с кнопкой Начать игру
    function createModal() {
      const modal = document.getElementById('modal');
      const form = document.createElement('form');
      const input = document.createElement('input');
      const startBtn = document.createElement('button');
      const title = document.createElement('h1');
      const subtitle = document.createElement('h2');
      title.textContent = 'Игра в пары';
      subtitle.textContent = 'Выберите количество карточек по вертикали и горизонтали';
      startBtn.textContent = 'Начать игру';
      form.classList.add('form');
      input.classList.add('form-input');
      startBtn.classList.add('btn-start');
      title.classList.add('form-title');
      subtitle.classList.add('form-subtitle');
      input.type = 'number';
      input.max = '10';
      input.min = '2';
      input.step = '2';
      input.placeholder = 'Введите четное число от 2 до 10';
      modal.append(form);
      form.append(title);
      form.append(input);
      form.append(subtitle);
      form.append(startBtn);
      return {
        form,
        input,
        startBtn,
        title
      };
    };

    // Этап 5. Создаем таймер
    function timeOut(count) {
      setTimeout(() => {
        const form = document.querySelector('.form');
        const timerMessadge = document.createElement('div');
        const gameField = document.getElementById('game-field');
        timerMessadge.textContent = 'Время вышло';
        timerMessadge.classList.add('timer');
        form.append(timerMessadge);
        form.classList.remove('hidden');
        gameField.innerHTML = '';
      }, count)
    };

    // Этап 6. Инициализация игры
    function initialGame() {
      const modal = createModal();
      // клик по кнопке начать игру
      modal.startBtn.addEventListener('click', e => {
        // убираем перезагрузку страницы
        e.preventDefault();
        // забираем значение из инпута
        let inputValue = modal.input.value;
        // поверяем корректность полученных цифр
        if ((inputValue >= 2) && (inputValue <= 10) && ((inputValue % 2) == 0)) {
          let cound = Math.pow(inputValue, 2) / 2;
          startGame(cound); // изменила
          // создаем сетку
          const cards = document.querySelectorAll('.card');
          let columns;
          if (cound === 2) {
            columns = 2;
          }
          if (cound === 8) {
            columns = 4;
          }
          if (cound === 18) {
            columns = 6;
          }
          if (cound === 32) {
            columns = 8;
            for (let card of cards) {
              card.style = `min-width: 0; justify-self: stretch;`;
            }
          }
          if (cound === 50) {
            columns = 10;
            for (let card of cards) {
              card.style = `min-width: 0; justify-self: stretch;`;
            }
          }
          const gameField = document.getElementById('game-field');
          gameField.style = `grid-template-columns: repeat(${columns}, 1fr);`;

          // убираем модальное окно
          modal.form.classList.add('hidden');
        } else {
          modal.input.value = 4;
        }
      });
      timeOut(60000);
    }
  });
})();
