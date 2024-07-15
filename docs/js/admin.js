async function createLogginField() {
  return new Promise((resolve) => {
    const loginModal = document.querySelector('.login-modal');
    const logIcon = document.querySelector('.user-login');
    const modalOpener = document.querySelector('.modal-opener')
    const siteBackground = document.body;
    const overlay = document.querySelector('#overlay');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    // Код для створення вікна входу/реєстрації

    function openModal(event) {
      event.preventDefault();
      event.preventDefault();
      emailInput.value = '';
      passwordInput.value = '';

      loginModal.style.display = 'block';
      overlay.style.display = 'block';
      siteBackground.style.overflow = 'hidden';
      setTimeout(() => {
        loginModal.classList.add('visible');
        resolve();
      }, 50);
    };
    logIcon.addEventListener('click', openModal);
    modalOpener.addEventListener('click', openModal);
    const closeBtn = loginModal.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
  });
};

const closeModal = () => {
  const loginModal = document.querySelector('.login-modal');
  const siteBackground = document.body;
  const overlay = document.querySelector('#overlay');
  loginModal.style.display = 'none';
  overlay.style.display = 'none';
  siteBackground.style.overflow = '';
  setTimeout(() => {
    loginModal.classList.remove('visible');
  }, 10);
}

const saveUserData = () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex = /^[A-Za-z0-9]+$/;

  const email = emailInput.value;
  const password = passwordInput.value;
  if (emailRegex.test(email) && passwordRegex.test(password)) {
    const user = {
      email: email,
      password: password,
    };
    const key = `userData_${email}`
    localStorage.setItem(key, JSON.stringify(user));
    alert('Вітаємо, ваші персональні дані успішно вкрадені! Дякуємо за співпрацю :)');
  }
}

async function getUserPassword() {
  await createLogginField();

  //усі змінні для вікна реєстрації
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberMeInput = document.getElementById('checkbox');
  const submitBtn = document.querySelector('.submitBtn');

  //Валідація форм
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex = /^[A-Za-z0-9]+$/;

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;
    const isEmailValid = emailRegex.test(userEmail);
    const isPasswordValid = passwordRegex.test(userPassword);

    if (isEmailValid && isPasswordValid) {
      alert('Вітаємо в особистому кабінеті, який ще не зверстаний автором :)')
      closeModal(event);
      if (rememberMeInput.checked) {
        saveUserData();
      }
    } else {
      if (userEmail.length === 0) {
        emailInput.value = '';
        emailInput.style.boxShadow = '0 0 23px 0px red';
        emailInput.placeholder = 'Поле має бути заповнене!';
      } else if (!isEmailValid) {
        emailInput.value = '';
        emailInput.style.boxShadow = '0 0 23px 0px red';
        emailInput.placeholder = 'Електронна пошта вказана не вірно!';
      }
      if (userPassword.length === 0) {
        passwordInput.value = '';
        passwordInput.style.boxShadow = '0 0 23px 0px red';
        passwordInput.placeholder = 'Поле має бути заповнене!';
      } else if (!isPasswordValid) {
        passwordInput.value = '';
        passwordInput.style.boxShadow = '0 0 23px 0px red';
        passwordInput.placeholder = 'Пароль вказаний не вірно!';
      }
    }
  });
}

const showUserDataForInput = async () => {
  await getUserPassword();
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  emailInput.addEventListener('input', () => {
    const email = emailInput.value;
    const key = `userData_${email}`;
    const storedUser = localStorage.getItem(key);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      passwordInput.placeholder = `${user.password}`;
    } else {
      passwordInput.placeholder = '';
    }
  });
}
showUserDataForInput();

document.addEventListener("DOMContentLoaded", function() {
  const burgerBtn = document.querySelector('.burger-btn');
  const navbar = document.querySelector('.bottom__navbar');
  const medias = document.querySelector('.bottom__medias');
  const userLogin = document.querySelector('.user-login');

  burgerBtn.addEventListener('click', function() {
      navbar.classList.toggle('active');
      medias.classList.toggle('active');
      userLogin.classList.toggle('active');
  });
});
