window.addEventListener('DOMContentLoaded', () => {
  function detailsActivation(buttons, item) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        item.classList.toggle('active');
      });
    });
  }

  const detailsButton = document.querySelectorAll('.details-button');
  const detailsBlock = document.querySelector('.pricing__details');

  detailsActivation(detailsButton, detailsBlock);

  function tabActivation(list) {
    list.forEach((item) => {
      item.addEventListener('click', () => {
        list.forEach((it) => it.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  const tab = document.querySelectorAll('.timetable__tab');

  tabActivation(tab);

  function selfTabActivation(list) {
    list.forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  }

  const answerList = document.querySelectorAll('.answer__item');
  const cardList = document.querySelectorAll('.card');

  selfTabActivation(answerList);
  selfTabActivation(cardList);

  // Menu

  function menuActivation(menu, button) {
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

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.header__button-menu');

  menuActivation(menu, menuButton);

  function smothScroll() {
    function handleIntersection(entries) {
      entries.forEach((entry) => {
        const targetAnchor = document.querySelector(`.anchor[href="#${entry.target.id}"]`);

        if (entry.isIntersecting) {
          targetAnchor.classList.add('active');
        } else {
          targetAnchor.classList.remove('active');
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.3 });

    const anchors = document.querySelectorAll('.anchor');

    anchors.forEach((anchor) => {
      const targetElement = document.querySelector(anchor.getAttribute('href'));

      if (targetElement) {
        observer.observe(targetElement);

        anchor.addEventListener('click', (event) => {
          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
          });
        });
      }
    });
  }

  smothScroll();

  // Modal

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

  // Validation

  function validate(form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('register-name').value;
      const phoneNumber = document.getElementById('register-number').value;

      const nameRegex = /^[\p{Script=Cyrillic}\s-]{5,30}$/u;
      const phoneNumberRegex = /^380\d{9}$/;

      if (!nameRegex.test(name)) {
        alert("Будь ласка, введіть коректне ім'я (лише літери).");
        return false;
      }

      if (!phoneNumberRegex.test(phoneNumber)) {
        alert('Будь ласка, введіть коректний номер телефону (починаючи з 38).');
        return false;
      }

      modalActivation();
    });
  }

  const form = document.getElementById('register-form');

  validate(form);
});
