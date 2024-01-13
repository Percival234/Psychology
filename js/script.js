window.addEventListener('DOMContentLoaded', () => {
  // DETAILS

  function activateDetails() {
    const buttons = document.querySelectorAll('.details-button');
    const details = document.querySelector('.pricing__details');

    buttons.forEach((button) =>
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        details.classList.toggle('active');
      })
    );
  }

  activateDetails();

  // TABS

  function activateTabs() {
    const tabs = document.querySelectorAll('.timetable__tab');

    tabs.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }

  activateTabs();

  // SELFCLICK

  function activateSelfTabs(list) {
    console.log(list);
    list.forEach((item) =>
      item.addEventListener('click', (event) => {
        event.preventDefault();
        item.classList.toggle('active');
      })
    );
  }

  const answerList = document.querySelectorAll('.answer__item');
  const cardList = document.querySelectorAll('.card');

  activateSelfTabs(answerList);
  activateSelfTabs(cardList);

  // MENU

  function menuActivation() {
    const menu = document.querySelector('.menu');
    const button = document.querySelector('.header__button-menu');
    const backdrop = document.createElement('div');

    function open() {
      button.classList.add('active');
      menu.classList.add('active');
      backdrop.classList.add('backdrop');
      document.body.append(backdrop);
    }

    function close() {
      button.classList.remove('active');
      menu.classList.remove('active');
      backdrop.remove();
    }

    button.addEventListener('click', () => {
      menu.classList.contains('active') ? close() : open();
    });

    menu.addEventListener('click', close);
    backdrop.addEventListener('click', close);
  }

  menuActivation();

  // SCROLL

  function handleIntersection(entries, observer, callback) {
    entries.forEach((entry) => {
      const targetAnchor = document.querySelector(`.anchor[href="#${entry.target.id}"]`);

      if (entry.isIntersecting) {
        targetAnchor.classList.add('active');
      } else {
        targetAnchor.classList.remove('active');
      }

      callback(targetAnchor);
    });
  }

  function createObserver(callback) {
    const observer = new IntersectionObserver(
      (entries) => handleIntersection(entries, observer, callback),
      { threshold: 0.3 }
    );
    return observer;
  }

  function addSmoothScroll(anchor, targetElement) {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }

  function smoothScroll() {
    const anchors = document.querySelectorAll('.anchor');

    const observer = createObserver((targetAnchor) => {
      const targetElement = document.querySelector(targetAnchor.getAttribute('href'));

      addSmoothScroll(targetAnchor, targetElement);
      observer.observe(targetElement);
    });

    anchors.forEach((anchor) => {
      const targetElement = document.querySelector(anchor.getAttribute('href'));

      addSmoothScroll(anchor, targetElement);
      observer.observe(targetElement);
    });
  }

  smoothScroll();

  // MODAL

  function modalActivation() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    document.body.append(backdrop);

    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.modal__button');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    function close() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      backdrop.remove();
    }

    closeButton.addEventListener('click', close);
    backdrop.addEventListener('click', close);
  }

  // FORM SUBMITTING

  const form = document.getElementById('register-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('register-name').value;
    const phoneNumber = document.getElementById('register-number').value;

    const isValidName = /^[\p{Script=Cyrillic}\s-]{5,30}$/u.test(name);
    const isValidPhoneNumber = /^380\d{9}$/.test(phoneNumber);

    if (!isValidName) {
      alert("Будь ласка, введіть коректне ім'я (лише літери).");
      return;
    }

    if (!isValidPhoneNumber) {
      alert('Будь ласка, введіть коректний номер телефону (починаючи з 38).');
      return;
    }

    modalActivation();
  });
});
