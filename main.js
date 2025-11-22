const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const newUser = {};

function inputEmail() {
  rl.question('Ваша почта: ', (email) => {
    // Создаём регулярное выражение
    const phoneRegex = /^(?:\+7|8)?[\s\-\.]?\(?\d{3}\)?[\s\-\.]?\d{3}[\s\-\.]?\d{2}[\s\-\.]?\d{2}$/;

    if (phoneRegex.test(email) /* Проверяем регулярное выражение */) {
      newUser.email = email;
      inputEmail();
    } else {
      console.log('❌ почта неверная, попробуйте ещё раз.');
      inputEmail(); // Вызываем эту же функцию заново
    }
  });
}

// Ввод почты
function inputEmail() {
  rl.question('Напишите вашу почту: ', (email) => {
    /**
    Условия:
Разрешить буквы, цифры, точки и тире до @
После @ — буквы и точки
Домен — 2–6 букв
     **/
     const EmailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z.]+\.[a-zA-Z]{2,6}$/;
   
    email = email.trim();
    if (EmailRegex.test(email)) {
      newUser.email = email;
      inputCity();
      } else {
      console.log('❌ Почта неверная, попробуйте ещё раз.');
      inputEmail();
    }
  });
}

function inputCity() {
  rl.question('Напишите ваш город в котором проживаете: ', (city) => {
  /**
   Условия:
   Минимум 2 символа
Никаких цифр
Пробелы допускаются (например, “Нижний Новгород”)
Если город неверный — показать ошибку и запросить снова
  **/
    const cityRegex = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\s]{1,}$/;
    if (cityRegex.test(city)) {
      newUser.city = city;
      console.log('\n✅ Новый пользователь:');
      console.log(newUser);
      rl.close();
    } else {
      console.log('❌ Город введен неверно, попробуйте ещё раз.');
      inputCity();
    }
  });
}

// Вызываем функцию для ввода телефона
inputEmail();