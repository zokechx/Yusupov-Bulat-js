// 1. Найти все элементы с классом .todo__item
const items = document.querySelectorAll('.todo__item');

// 2. Перебрать коллекцию циклом forEach
items.forEach(function (item) {
  // 3. Для каждого элемента найти его кнопку .todo__btn
  const button = item.querySelector('.todo__btn');

  // 4. Повесить на кнопку обработчик onclick
  button.onclick = function () {
    // 5. При клике переключить класс done у родительского элемента .todo__item
    item.classList.toggle('done');
    alert('Выполнено!')
  };
});