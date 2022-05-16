"use strick";
window.addEventListener('DOMContentLoaded', async () => {
const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".nav"),
  menuItem = document.querySelectorAll(".nav-item"),
  blackoutBlock = document.querySelector('.block'),
  body = document.querySelector('body');


// Hamburger menu
hamburger.addEventListener("click", () => {
  menu.classList.toggle("open");
  hamburger.classList.toggle("active");
  blackoutBlock.classList.toggle("blackout");
  body.classList.toggle('remove-scroll');
});
menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("open");
    blackoutBlock.classList.remove("blackout");
    body.classList.remove('remove-scroll');
  });
});
blackoutBlock.addEventListener("click", () => {
  hamburger.classList.remove("active");
  menu.classList.remove("open");
  blackoutBlock.classList.remove("blackout");
  body.classList.remove('remove-scroll');
});

//Carousel
const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");
const carousel = document.querySelector("#slider-inner");
const cardsLeft = document.querySelector("#cards-left");
const cardsRight = document.querySelector("#cards-right");
const cardsActive = document.querySelector("#cards-active");
const slider = document.querySelector(".slider");

const modalWindow = document.querySelector('.modal');
const closeBtn = document.getElementsByClassName('modal-close');
const modalInner = document.querySelector(".modal-inner");


async function getData() {
  const res = await fetch('pets.json');
  const data = await res.json();
  return data;
}
let pets = await getData();

const media1280 = () => {
    let arrNumLeft = [];
    const createRandom = () => {
      const arr = [];
      for(let i =0; i < 3; i++) {
        const random = Math.floor(Math.random()*8);
        if(random !== arr[i-1] && random !== arr[i-2] && random !== arr[i-3] && random !== arrNumLeft[0] && random !== arrNumLeft[1] && random !== arrNumLeft[2]){
          arr.push(random);
        } else {
          i--;
        }
      }
      arrNumLeft = [];
      arrNumLeft = arr;
    };

    function createCardTemplate (i) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src=${pets[i].img} alt=${pets[i].name} class="friend">
        <div class="name">${pets[i].name}</div>
        <button class="btn-transparent close">Learn more</button>
      `;
      return card;
    };
    function renderCard (block) {
      for (let i = 0; i < 3; i++) {
      const card = createCardTemplate(arrNumLeft[i]);
      card.setAttribute('id', `${arrNumLeft[i]}`);
      block.appendChild(card);
      }
    };
    createRandom();
    renderCard(cardsLeft);

    createRandom();
    renderCard(cardsActive);

    createRandom();
    renderCard(cardsRight);
    console.log(arrNumLeft);


    const moveLeft = () => {
      carousel.classList.add("transition-left");
      btnLeft.removeEventListener("click", moveLeft);
      btnRight.removeEventListener("click", moveRight);
    };

    const moveRight = () => {
      carousel.classList.add("transition-right");
      btnLeft.removeEventListener("click", moveLeft);
      btnRight.removeEventListener("click", moveRight);
    };

    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);
    carousel.addEventListener("animationend", (animationEvent) => {
      let changedCards;
      if (animationEvent.animationName === "move-left") {
        carousel.classList.remove("transition-left");
        changedCards = cardsLeft;
        cardsActive.innerHTML = cardsLeft.innerHTML;
        changedCards.innerHTML = '';
        createRandom();
        renderCard(cardsLeft);
      } else {
        carousel.classList.remove("transition-right");
        changedCards = cardsRight;
        cardsActive.innerHTML = cardsRight.innerHTML;
        changedCards.innerHTML = '';
        createRandom();
        renderCard(cardsRight);
      }

      
      btnLeft.addEventListener("click", moveLeft);
      btnRight.addEventListener("click", moveRight);
    });
};
const media768 = () => {
  let arrNumLeft = [];
  const createRandom = () => {
    const arr = [];
    for(let i =0; i < 2; i++) {
      const random = Math.floor(Math.random()*8);
      if(random !== arr[i-1] && random !== arr[i-2] && random !== arrNumLeft[0] && random !== arrNumLeft[1]){
        arr.push(random);
      } else {
        i--;
      }
    }
    arrNumLeft = [];
    arrNumLeft = arr;
  };

  function createCardTemplate (i) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src=${pets[i].img} alt=${pets[i].name} class="friend">
      <div class="name">${pets[i].name}</div>
      <button class="btn-transparent close">Learn more</button>
    `;
    return card;
  };
  function renderCard (block) {
    for (let i = 0; i < 2; i++) {
    const card = createCardTemplate(arrNumLeft[i]);
    card.setAttribute('id', `${arrNumLeft[i]}`);
    block.appendChild(card);
    }
  };
  createRandom();
  renderCard(cardsLeft);

  createRandom();
  renderCard(cardsActive);

  createRandom();
  renderCard(cardsRight);
  console.log(arrNumLeft);


  const moveLeft = () => {
    carousel.classList.add("transition-left");
    btnLeft.removeEventListener("click", moveLeft);
    btnRight.removeEventListener("click", moveRight);
  };

  const moveRight = () => {
    carousel.classList.add("transition-right");
    btnLeft.removeEventListener("click", moveLeft);
    btnRight.removeEventListener("click", moveRight);
  };

  btnLeft.addEventListener("click", moveLeft);
  btnRight.addEventListener("click", moveRight);
  carousel.addEventListener("animationend", (animationEvent) => {
    let changedCards;
    if (animationEvent.animationName === "move-left") {
      carousel.classList.remove("transition-left");
      changedCards = cardsLeft;
      cardsActive.innerHTML = cardsLeft.innerHTML;
      changedCards.innerHTML = '';
      createRandom();
      renderCard(cardsLeft);
    } else {
      carousel.classList.remove("transition-right");
      changedCards = cardsRight;
      cardsActive.innerHTML = cardsRight.innerHTML;
      changedCards.innerHTML = '';
      createRandom();
      renderCard(cardsRight);
    }  
    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);
    });
};
const media320 = () => {
  let arrNumLeft = [];
  const createRandom = () => {
    const arr = [];
    for(let i =0; i < 1; i++) {
      const random = Math.floor(Math.random()*8);
      if(random !== arr[i-1] && random !== arrNumLeft[0]){
        arr.push(random);
      } else {
        i--;
      }
    }
    arrNumLeft = [];
    arrNumLeft = arr;
  };

  function createCardTemplate (i) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src=${pets[i].img} alt=${pets[i].name} class="friend">
      <div class="name">${pets[i].name}</div>
      <button class="btn-transparent close">Learn more</button>
    `;
    return card;
  };
  function renderCard (block) {
    for (let i = 0; i < 1; i++) {
    const card = createCardTemplate(arrNumLeft[i]);
    card.setAttribute('id', `${arrNumLeft[i]}`);
    block.appendChild(card);
    }
  };
  createRandom();
  renderCard(cardsLeft);

  createRandom();
  renderCard(cardsActive);

  createRandom();
  renderCard(cardsRight);
  console.log(arrNumLeft);


  const moveLeft = () => {
    carousel.classList.add("transition-left");
    btnLeft.removeEventListener("click", moveLeft);
    btnRight.removeEventListener("click", moveRight);
  };

  const moveRight = () => {
    carousel.classList.add("transition-right");
    btnLeft.removeEventListener("click", moveLeft);
    btnRight.removeEventListener("click", moveRight);
  };

  btnLeft.addEventListener("click", moveLeft);
  btnRight.addEventListener("click", moveRight);
  carousel.addEventListener("animationend", (animationEvent) => {
    let changedCards;
    if (animationEvent.animationName === "move-left") {
      carousel.classList.remove("transition-left");
      changedCards = cardsLeft;
      cardsActive.innerHTML = cardsLeft.innerHTML;
      changedCards.innerHTML = '';
      createRandom();
      renderCard(cardsLeft);
    } else {
      carousel.classList.remove("transition-right");
      changedCards = cardsRight;
      cardsActive.innerHTML = cardsRight.innerHTML;
      changedCards.innerHTML = '';
      createRandom();
      renderCard(cardsRight);
    }
    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);
    });
};
if(window.matchMedia("(min-width: 1280px)").matches) {
  media1280();
} else if (window.matchMedia("(min-width: 768px)").matches) {
  media768();
} else if (window.matchMedia("(max-width: 767px)").matches) {
  media320();
}
window.matchMedia("(min-width: 1280px)").addEventListener('change', media1280);
window.matchMedia("(max-width: 1279px)").addEventListener('change', media768);
window.matchMedia("(max-width: 767px)").addEventListener('change', media320);

// Modal
const petTemplate = (i) => {
  modalInner.innerHTML = `
  <div class="modal-close">&times;</div>
  <img src=${pets[i].img} alt=${pets[i].name} class="modal-img">
  <div class="modal-content">
      <div class="modal-name">${pets[i].name}</div>
      <div class="type-breed">${pets[i].type} - ${pets[i].breed}</div>
      <div class="modal-description">
          ${pets[i].description}
      </div>
      <ul class="modal-list">
          <li class="modal-list-item"><b>Age:</b> ${pets[i].age}</li>
          <li class="modal-list-item"><b>Inoculations:</b> ${pets[i].inoculations}</li>
          <li class="modal-list-item"><b>Diseases:</b> ${pets[i].diseases}</li>
          <li class="modal-list-item"><b>Parasites:</b> ${pets[i].parasites}</li>
      </ul>
  </div>
  `;
};
// if(window.clientHeight < modalWindow.clientHeight) {
//   modalWindow.style.overflow = 'auto';
// }
const closeModal = () => {
  modalWindow.classList.add('hide');
  modalWindow.classList.remove('show');
  body.classList.remove('remove-scroll');
  blackoutBlock.classList.remove("blackout");
};
const openModal = (id) => {
  modalWindow.classList.add('show');
  modalWindow.classList.remove('hide');

  blackoutBlock.classList.add("blackout");
  body.classList.add('remove-scroll');
  petTemplate(id);
};

slider.addEventListener('click', (e) => {
  if(e.target.classList.contains('card') || e.target.classList.contains('friend') || e.target.classList.contains('name') || e.target.classList.contains('btn-transparent')) {
      openModal(e.target.closest('.card').id);
      console.log(e.target.closest('.card').id);
      
  } 
});
blackoutBlock.addEventListener('mouseover', () => {
  closeBtn[0].classList.toggle("hover-btn");
  
});
blackoutBlock.addEventListener('mouseout', () => {
  closeBtn[0].classList.toggle("hover-btn");
});
document.addEventListener('click', (e) => {
  if (e.target.matches('.modal-close')) {
    closeModal();
  }
});
blackoutBlock.addEventListener('click', closeModal);
});
