'use strict';

const pairs = document.querySelector('.pairs');
const information = document.querySelector('.information');
const moves = document.querySelector('.numberOfMoves');
const minutesContent = document.querySelector('.minutes');
const secondsContent = document.querySelector('.seconds');
const allBtns = document.querySelectorAll('.btn_choose');

const cards = ["./images/1.png",
"./images/2.png",
"./images/3.png",
"./images/4.png",
"./images/5.png",
"./images/6.png",
"./images/7.png",
"./images/8.png",
"./images/9.png",
"./images/10.png"];

let clickCount = 0;
let numberOfMoves = 0;
let seconds = 0;
let score = 0;
let html, numberCards, allCards, firstImage, timePass;

// moves.textContent = numberOfMoves;

const shuffle = function(array) {
  let currentIndex = array.length; 
  let randomIndex;

  while(currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const defaultSet = function(number) {
  seconds = 0;

  if (timePass) {
    clearInterval(timePass);
  }

  timePass = setInterval(() => { 
    seconds++;
    let newSeconds = seconds % 60;
    let minutes = Math.floor(seconds /60);
  
    minutesContent.textContent = minutes;
    secondsContent.textContent = newSeconds;
  }, 1000);

  numberOfMoves = 0;
  moves.textContent = numberOfMoves;
  pairs.innerHTML = '';
  pairs.classList = "pairs";
  pairs.classList.add(`column_${number}`);
  numberCards = cards.slice(0, number);
  allCards = numberCards.concat(numberCards);
  shuffle(allCards);
  for (let i = 0; i < allCards.length; i++) {
    pairs.innerHTML += `<article class="card">
                          <img src="${allCards[i]}">
                          <div class="bcImage" data-card="${i}"></div>
                        </article>`;
  }

  information.classList.remove('hidden');
}

allBtns.forEach(btn => btn.addEventListener('click', function() {
  defaultSet(btn.dataset.number);
}));

pairs.addEventListener('click', function(e) {
  if (e.target.className === 'bcImage') {
    clickCount++;

    if (clickCount === 1) {
      e.target.classList.add('hidden');
      firstImage = e.target.previousElementSibling;
    } else if (clickCount === 2) {
      numberOfMoves++;
      moves.textContent = numberOfMoves;
      e.target.classList.add('hidden');

      if (e.target.previousElementSibling.src === firstImage.src) {
        setTimeout(() => {
          alert('Pogodili ste!');
        }, 100);
      } else {
        setTimeout(() => {
          alert('Niste pogodili!');
          e.target.classList.remove('hidden');
          firstImage.nextElementSibling.classList.remove('hidden');
        }, 100)
      }

      clickCount = 0;
    }
    // console.log(e.target.previousElementSibling);
    // if (e.target.previousElementSibling.src !== ) {}
  }
});
