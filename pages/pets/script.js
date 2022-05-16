"use strick";
window.addEventListener('DOMContentLoaded', async () => {
const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".nav"),
  menuItem = document.querySelectorAll(".nav-item"),
  blackoutBlock = document.querySelector('.block'),
  body = document.querySelector('body'),
  header = document.querySelector('.header'),
  cardItem = document.querySelectorAll('.card'),
  petsWrapper = document.querySelector('.pets-wrapper');

// Hamburger menu
hamburger.addEventListener("click", () => {
  menu.classList.toggle("open");
  hamburger.classList.toggle("active");
  blackoutBlock.classList.toggle("blackout");
  body.classList.toggle('remove-scroll');
  header.classList.toggle('blackout-header');
});
menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("open");
    blackoutBlock.classList.remove("blackout");
    body.classList.remove('remove-scroll');
    header.classList.remove('blackout-header');
  });
});
blackoutBlock.addEventListener("click", () => {
  hamburger.classList.remove("active");
  menu.classList.remove("open");
  blackoutBlock.classList.remove("blackout");
  body.classList.remove('remove-scroll');
  header.classList.remove('blackout-header');
});


// Modal
const gridContainer = document.querySelector(".grid-container");
const modalWindow = document.querySelector('.modal');
const closeBtn = document.getElementsByClassName('modal-close');
const modalInner = document.querySelector(".modal-inner");

let petsPage = [0, 1, 2, 3, 4, 5, 6, 7, 
  0, 1, 2, 3, 4, 5, 6, 7,
  0, 1, 2, 3, 4, 5, 6, 7,
  0, 1, 2, 3, 4, 5, 6, 7,
  0, 1, 2, 3, 4, 5, 6, 7,
  0, 1, 2, 3, 4, 5, 6, 7];



  async function getData() {
    const res = await fetch('pets.json');
    const data = await res.json();
    return data;
}
let pets = await getData();


function petTemplateModal (i) {
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
  petTemplateModal(id);
};

gridContainer.addEventListener('click', (e) => {
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

// Pagination
const btnStart = document.querySelector("#start");
const btnPrev = document.querySelector("#prev");
const btnPage = document.querySelector(".page");
const btnNext = document.querySelector("#next");
const btnEnd = document.querySelector("#end");


async function petTemplateCard(arr) {
  console.log(arr);
  for (let j = 0; j < arr.length; j++) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
    <img src=${pets[arr[j]].img} alt=${pets[arr[j]].name} class="friend">
    <div class="name">${pets[arr[j]].name}</div>
    <button class="btn-transparent close">Learn more</button>
    `;
    newCard.setAttribute('id', `${arr[j]}`);
    petsWrapper.appendChild(newCard);
  }
};
const media1280 = () => {
    let arr1 = petsPage.slice(0, 8).sort(() => Math.random() - 0.5);
    let arr2 = petsPage.slice(8, 16).sort(() => Math.random() - 0.5);
    let arr3 = petsPage.slice(16, 24).sort(() => Math.random() - 0.5);
    let arr4 = petsPage.slice(24, 32).sort(() => Math.random() - 0.5);
    let arr5 = petsPage.slice(32, 40).sort(() => Math.random() - 0.5);
    let arr6 = petsPage.slice(40, 48).sort(() => Math.random() - 0.5);
    const array = [arr1, arr2, arr3, arr4, arr5, arr6];
    petTemplateCard(array[0]);
    let index = 1;

    const startPage = () => {
      activeNext();
      petsWrapper.innerHTML = '';
      index = 1;
      petTemplateCard(array[0]);
      btnPage.textContent = `1`;
      disabledPrev();
      return index;
    };
    const prevPage = () => {
      if(index <= 6) {
        index -= 1;
        activeNext();
        petsWrapper.innerHTML = '';
        petTemplateCard(array[index-1]);
        btnPage.textContent = `${index}`;
      } 
      if(index === 1)  {
        disabledPrev();
        activeNext();
        petsWrapper.innerHTML = '';
        petTemplateCard(array[0]);
        btnPage.textContent = `${index}`;
      }
      return index;
    };
    const nextPage = () => {
      if(index <= 5) {
        petsWrapper.innerHTML = '';
        petTemplateCard(array[index]);
        btnPage.textContent = `${index+1}`;
        index += 1;
        disabledNext();
      } else if(index > 5) {
        petsWrapper.innerHTML = '';
        petTemplateCard(array[0]);
        index = 1;
        btnPage.textContent = `${index}`;
      }
      disabledPrev();
      
      return index;
    };
    const lastPage = () => {
      activePrev();
      petsWrapper.innerHTML = '';
      petTemplateCard(array[5]);
      index = 6;
      disabledNext();
      btnPage.textContent = `${index}`;
      return index;
    };

    disabledPrev();
    function activePrev() {
      btnStart.classList.remove('previous');
      btnPrev.classList.remove('previous');
      btnStart.classList.add('next');
      btnPrev.classList.add('next');
      btnStart.addEventListener('click', startPage);
      btnPrev.addEventListener('click', prevPage);
    }
    function activeNext() {
      btnNext.classList.remove('previous');
      btnEnd.classList.remove('previous');
      btnNext.classList.add('next');
      btnEnd.classList.add('next');
      btnEnd.addEventListener('click', lastPage);
      btnNext.addEventListener('click', nextPage);
    }
    function disabledPrev() {
      if(index === 1) {
        btnStart.classList.add('previous');
        btnPrev.classList.add('previous');
        btnStart.classList.remove('next');
        btnPrev.classList.remove('next');
        btnStart.removeEventListener('click', startPage);
        btnPrev.removeEventListener('click', prevPage);
      } else if(index > 1) {
        activePrev();
      }
    }

    function disabledNext() {
      if(index === 6) {
        btnNext.classList.add('previous');
        btnEnd.classList.add('previous');
        btnNext.classList.remove('next');
        btnEnd.classList.remove('next');
        btnNext.removeEventListener('click', nextPage);
        btnEnd.removeEventListener('click', lastPage);
      } else if(index < 6) {
        activeNext();
      }
    }
    btnNext.addEventListener('click', nextPage);
    btnEnd.addEventListener('click', lastPage);
    btnStart.addEventListener('click', startPage);
    btnPrev.addEventListener('click', prevPage);
};
const media768 = () => {
  let arr1 = petsPage.slice(0, 6).sort(() => Math.random() - 0.5);
    let arr2 = petsPage.slice(6, 12).sort(() => Math.random() - 0.5);
    let arr3 = petsPage.slice(12, 18).sort(() => Math.random() - 0.5);
    let arr4 = petsPage.slice(18, 24).sort(() => Math.random() - 0.5);
    let arr5 = petsPage.slice(24, 30).sort(() => Math.random() - 0.5);
    let arr6 = petsPage.slice(30, 36).sort(() => Math.random() - 0.5);
    let arr7 = petsPage.slice(36, 42).sort(() => Math.random() - 0.5);
    let arr8 = petsPage.slice(42, 48).sort(() => Math.random() - 0.5);
    const array = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8].sort(() => Math.random() - 0.5);
    petTemplateCard(array[0]);
    let index = 1;

    const startPage = () => {
      activeNext();
      petsWrapper.innerHTML = '';
      index = 1;
      petTemplateCard(array[0]);
      btnPage.textContent = `1`;
      disabledPrev();
      return index;
    };
    const prevPage = () => {
      if(index <= 8) {
        index -= 1;
        activeNext();
        petsWrapper.innerHTML = '';
        petTemplateCard(array[index-1]);
        btnPage.textContent = `${index}`;
      } 
      if(index === 1)  {
        disabledPrev();
        activeNext();
        petsWrapper.innerHTML = '';
        petTemplateCard(array[0]);
        btnPage.textContent = `${index}`;
      }
      return index;
    };
    const nextPage = () => {
      if(index <= 7) {
        petsWrapper.innerHTML = '';
        petTemplateCard(array[index]);
        btnPage.textContent = `${index+1}`;
        index += 1;
        disabledNext();
      } else if(index > 7) {
        petsWrapper.innerHTML = '';
        petTemplateCard(array[0]);
        index = 1;
        btnPage.textContent = `${index}`;
      }
      disabledPrev();
      
      return index;
    };

    const lastPage = () => {
      activePrev();
      petsWrapper.innerHTML = '';
      petTemplateCard(array[7]);
      index = 8;
      disabledNext();
      btnPage.textContent = `${index}`;
      return index;
    };

    disabledPrev();
    function activePrev() {
      btnStart.classList.remove('previous');
      btnPrev.classList.remove('previous');
      btnStart.classList.add('next');
      btnPrev.classList.add('next');
      btnStart.addEventListener('click', startPage);
      btnPrev.addEventListener('click', prevPage);
    }
    function activeNext() {
      btnNext.classList.remove('previous');
      btnEnd.classList.remove('previous');
      btnNext.classList.add('next');
      btnEnd.classList.add('next');
      btnEnd.addEventListener('click', lastPage);
      btnNext.addEventListener('click', nextPage);
    }
    function disabledPrev() {
      if(index === 1) {
        btnStart.classList.add('previous');
        btnPrev.classList.add('previous');
        btnStart.classList.remove('next');
        btnPrev.classList.remove('next');
        btnStart.removeEventListener('click', startPage);
        btnPrev.removeEventListener('click', prevPage);
      } else if(index > 1) {
        activePrev();
      }
    }

    function disabledNext() {
      if(index === 8) {
        btnNext.classList.add('previous');
        btnEnd.classList.add('previous');
        btnNext.classList.remove('next');
        btnEnd.classList.remove('next');
        btnNext.removeEventListener('click', nextPage);
        btnEnd.removeEventListener('click', lastPage);
      } else if(index < 8) {
        activeNext();
      }
    } 
      btnNext.addEventListener('click', nextPage);
      btnEnd.addEventListener('click', lastPage);
      btnStart.addEventListener('click', startPage);
      btnPrev.addEventListener('click', prevPage);
 
};
const media320 = () => {
  let arr1 = petsPage.slice(0, 3).sort(() => Math.random() - 0.5);
    let arr2 = petsPage.slice(3, 6).sort(() => Math.random() - 0.5);
    let arr3 = petsPage.slice(6, 9).sort(() => Math.random() - 0.5);
    let arr4 = petsPage.slice(9, 12).sort(() => Math.random() - 0.5);
    let arr5 = petsPage.slice(12, 15).sort(() => Math.random() - 0.5);
    let arr6 = petsPage.slice(15, 18).sort(() => Math.random() - 0.5);
    let arr7 = petsPage.slice(18, 21).sort(() => Math.random() - 0.5);
    let arr8 = petsPage.slice(21, 24).sort(() => Math.random() - 0.5);
    let arr9 = petsPage.slice(24, 27).sort(() => Math.random() - 0.5);
    let arr10 = petsPage.slice(27, 30).sort(() => Math.random() - 0.5);
    let arr11 = petsPage.slice(30, 33).sort(() => Math.random() - 0.5);
    let arr12 = petsPage.slice(33, 36).sort(() => Math.random() - 0.5);
    let arr13 = petsPage.slice(36, 39).sort(() => Math.random() - 0.5);
    let arr14 = petsPage.slice(39, 42).sort(() => Math.random() - 0.5);
    let arr15 = petsPage.slice(42, 45).sort(() => Math.random() - 0.5);
    let arr16 = petsPage.slice(45, 48).sort(() => Math.random() - 0.5);
   
    const array = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12, arr13, arr14, arr15, arr16].sort(() => Math.random() - 0.5);
    petTemplateCard(array[0]);
    let index = 1;

    const startPage = () => {
      activeNext();
      petsWrapper.innerHTML = '';
      index = 1;
      petTemplateCard(array[0]);
      btnPage.textContent = `1`;
      disabledPrev();
      return index;
    };
    const prevPage = () => {
      if(index <= 16) {
        index -= 1;
        activeNext();
        petsWrapper.innerHTML = '';
        petTemplateCard(array[index-1]);
        btnPage.textContent = `${index}`;
      } 
      if(index === 1)  {
        disabledPrev();
        activeNext();
        petsWrapper.innerHTML = '';
        petTemplateCard(array[0]);
        btnPage.textContent = `${index}`;
      }
      return index;
    };
    const nextPage = () => {
      if(index <= 15) {
        petsWrapper.innerHTML = '';
        petTemplateCard(array[index]);
        btnPage.textContent = `${index+1}`;
        index += 1;
        disabledNext();
      } else if(index > 15) {
        petsWrapper.innerHTML = '';
        petTemplateCard(array[0]);
        index = 1;
        btnPage.textContent = `${index}`;
      }
      disabledPrev();
      
      return index;
    };

    const lastPage = () => {
      activePrev();
      petsWrapper.innerHTML = '';
      petTemplateCard(array[15]);
      index = 16;
      disabledNext();
      btnPage.textContent = `${index}`;
      return index;
    };

    disabledPrev();
    function activePrev() {
      btnStart.classList.remove('previous');
      btnPrev.classList.remove('previous');
      btnStart.classList.add('next');
      btnPrev.classList.add('next');
      btnStart.addEventListener('click', startPage);
      btnPrev.addEventListener('click', prevPage);
    }
    function activeNext() {
      btnNext.classList.remove('previous');
      btnEnd.classList.remove('previous');
      btnNext.classList.add('next');
      btnEnd.classList.add('next');
      btnEnd.addEventListener('click', lastPage);
      btnNext.addEventListener('click', nextPage);
    }
    function disabledPrev() {
      if(index === 1) {
        btnStart.classList.add('previous');
        btnPrev.classList.add('previous');
        btnStart.classList.remove('next');
        btnPrev.classList.remove('next');
        btnStart.removeEventListener('click', startPage);
        btnPrev.removeEventListener('click', prevPage);
      } else if(index > 1) {
        activePrev();
      }
    }

    function disabledNext() {
      if(index === 16) {
        btnNext.classList.add('previous');
        btnEnd.classList.add('previous');
        btnNext.classList.remove('next');
        btnEnd.classList.remove('next');
        btnNext.removeEventListener('click', nextPage);
        btnEnd.removeEventListener('click', lastPage);
      } else if(index < 16) {
        activeNext();
      }
    } 
      btnNext.addEventListener('click', nextPage);
      btnEnd.addEventListener('click', lastPage);
      btnStart.addEventListener('click', startPage);
      btnPrev.addEventListener('click', prevPage);
};
if(window.matchMedia("(min-width: 1280px)").matches) {
  media1280();
} else if (window.matchMedia("(min-width: 768px)").matches) {
  media768();
} else if (window.matchMedia("(max-width: 767px)").matches) {
  media320();
}
window.matchMedia("(min-width: 1280px)").addEventListener('change', media1280);
window.matchMedia("(max-width: 767px)").addEventListener('change', media320);
window.matchMedia("(min-width: 768px)").addEventListener('change', media768);
});