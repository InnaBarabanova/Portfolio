// создаем пустой массив для хранения списка дел
let listArr = [];

// создаем глобальную переменную для хранения в ней идентификатора списка дел keyName
let listName = '';

// создаеи заголовок
function createAppTitle(title) {
   let appTitle = document.createElement('h2');
   appTitle.innerHTML = title;
   return appTitle;
}

// создаем элементы формы
function createTodoItemForm() {
   let form = document.createElement('form');
   let input = document.createElement('input');
   let buttonWrapper = document.createElement('div');
   let button = document.createElement('button');

   // присваиваем классы элементам и добавляем текст
   form.classList.add('input-group', 'mb-3');
   input.classList.add('form-control');
   input.placeholder = 'Введите название нового дела';
   buttonWrapper.classList.add('input-group-append');
   button.classList.add('btn', 'btn-primary');
   button.textContent = 'Добавить дело';

   // делаем кнопку не активной по умолчанию
   button.disabled = true;

   // размещаем элементы
   buttonWrapper.append(button);
   form.append(input);
   form.append(buttonWrapper);

   // добавляем событие для input, что бы активировать кнопку при заполнении поля
   input.addEventListener('input', function () {
      if (input.value !== '') {
         button.disabled = false;
      } else {
         button.disabled = true;
      }
   });

   // функция возвращает объект
   return {
      form,
      input,
      button,
   };
};

// создаем список
function createTodoList() {
   let list = document.createElement('ul');
   list.classList.add('list-group');
   return list;
};

// создаем элементы списка дел (объекты)
function createTodoItem(obj) {
   let item = document.createElement('li');

   // кнопки помещаем в элемент, который красиво покажет их в одной группе
   let buttonGroup = document.createElement('div');
   let doneButton = document.createElement('button');
   let deleteButton = document.createElement('button');

   // устанавливаем стили для элемента списка, а также для размещения кнопок в его правой части с помощью flex
   item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
   item.textContent = obj.name;
   buttonGroup.classList.add('btn-group', 'btn-grou-sm');
   doneButton.classList.add('btn', 'btn-success');
   doneButton.textContent = 'Готово';
   deleteButton.classList.add('btn', 'btn-danger');
   deleteButton.textContent = 'Удалить';

   // добавляем параметр со статусом дела
   if (obj.done == true) {
      item.classList.add('list-group-item-success');
   };

   // добавляем обработчики событий на кнопки
   doneButton.addEventListener('click', function () {
      item.classList.toggle('list-group-item-success');

      // добавляем цикл для работы с массивом списка дел по id
      for (const listItem of listArr) {
         if (listItem.id == obj.id) {
            listItem.done = !listItem.done;
         };
      };

      // сохраняем в LocalStorade
      saveList(listArr, listName);
   });

   deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
         item.remove();
      };

      // добавляем цикл для удаления элемента из массива по id
      for (let i = 0; i < listArr.length; i++) {
         if (listArr[i].id == obj.id) {
            listArr.splice(i, 1);
         };
      };

      // сохраняем в LocalStorade
      saveList(listArr, listName);
   });

   // вкладываем кнопки в отдельный элемент, что бы они объединились в один блок
   buttonGroup.append(doneButton);
   buttonGroup.append(deleteButton);
   item.append(buttonGroup);

   // приложению нужен доступ к самому элементу и кнопкам, что бы обрабатывыть событие нажатия
   return {
      item,
      doneButton,
      deleteButton,
   };
};

// функция для создания уникального id 
function createId(arr) {
   let max = 0;
   // создаем цикл для прохода по массиву
   for (const item of arr) {
      if (item.id > max) {
         max = item.id
      };
   };
   return max + 1;
};

// создаем функцию для сохранения массива в LocalStorage
function saveList(arr, keyName) {
   localStorage.setItem(keyName, JSON.stringify(arr));
};

// основная фукция для работы приложения, добавляем еще один аргумент, для возможности сохранять списки дел разных пользователей
function createTodoApp(container, title = 'Список дел', keyName, defArray = []) {
   let todoAppTitle = createAppTitle(title);
   let todoItemForm = createTodoItemForm();
   let todoList = createTodoList();

   container.append(todoAppTitle);
   container.append(todoItemForm.form);
   container.append(todoList);

   listName = keyName;
   listArr = defArray;

   // получаем сохраненные данные из LocalStorage
   let localData = localStorage.getItem(listName);

   // проверяем LocalStorage на пустоту
   if (localData !== null && localData !== '') {
      // расшифровываем стороку из LS в массив
      listArr = JSON.parse(localData);
      // создаем цикл, что бы из массива LocalStorage получить доступ к отдельным элементам списка
      for (const itemList of listArr) {
         let todoItem = createTodoItem(itemList);
         todoList.append(todoItem.item);
      };
   };

   // браузер создает событие submit на форме по нажатию на Enter или на кнопку по созданию дела
   todoItemForm.form.addEventListener('submit', function (e) {

      // эта строчка необходима, что бы предотвратить стандартное дейсвие браузера
      // в данном случае мы не хотим, что бы страница перезагружалась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввел в поле 
      if (!todoItemForm.input.value) {
         return;
      };

      // содаем объект для хранения данных о деле
      let newItem = {
         id: createId(listArr),
         name: todoItemForm.input.value,
         done: false,
      };

      let todoItem = createTodoItem(newItem);

      // добавляем новую запись в массив
      listArr.push(newItem);

      // создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);

      // деактивируем кнопку после отправки формы
      todoItemForm.button.disabled = true;

      // обнуляем значние в поле, что бы не пришлось это делать вручную
      todoItemForm.input.value = '';

      // сохраняем в LocalStorade
      saveList(listArr, listName);
   });
};

window.createTodoApp = createTodoApp;
