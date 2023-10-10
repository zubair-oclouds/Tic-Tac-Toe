const size: number = 3;
let turn: number = 0;
let turnCount: number = 0;
const player1: HTMLElement = document.querySelector('#player1') as HTMLElement;
const player2: HTMLElement = document.querySelector('#player2') as HTMLElement;
player1.style.animation = 'spin 10s linear infinite';

const setPlayers = () => {
  console.log("setplayers called");
  const usernameModal: HTMLElement = document.querySelector('.username-modal') as HTMLElement;
  usernameModal.style.display = 'flex';
}


const checkWin = (size: number, row: number, col: number, characterSymbol: string) => {
  //diagonal check
  if (row === col) {
    let diaFlag: boolean = true;

    for (let i = 0, j = 0; i < size; i++, j++) {
      if (document.querySelector(`[data-row="${i}"][data-col="${j}"]`)?.innerHTML !== characterSymbol) {
        diaFlag = false;
      }
    }
    if (diaFlag)
      return diaFlag;
  }

  //non-diagonal check
  if (row + col === size - 1) {
    let nonDiaFlag: boolean = true;

    for (let i = 0, j = size - 1; i < size; i++, j--) {
      if (document.querySelector(`[data-row="${i}"][data-col="${j}"]`)?.innerHTML !== characterSymbol) {
        nonDiaFlag = false;
      }
    }
    if (nonDiaFlag)
      return nonDiaFlag;
  }



  // horizontal and vertical check
  let horFlag: boolean = true;
  let verFlag: boolean = true;

  for (let i = 0; i < size; i++) {
    if (document.querySelector(`[data-row="${i}"][data-col="${col}"]`)?.innerHTML !== characterSymbol) {
      verFlag = false;
    }

    if (document.querySelector(`[data-row="${row}"][data-col="${i}"]`)?.innerHTML !== characterSymbol) {
      horFlag = false;
    }
  }

  if (horFlag || verFlag)
    return true;
  return false;
}

const makeBoard = (size: number) => {
  setPlayers();
  const gameBoard: HTMLElement = document.querySelector('#board') as HTMLElement;

  gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let row: number = 0; row < size; row++) {
    for (let col: number = 0; col < size; col++) {
      const box: HTMLElement = document.createElement('div') as HTMLElement;
      box.classList.add('box');
      box.setAttribute('data-row', row.toString());
      box.setAttribute('data-col', col.toString());
      gameBoard.appendChild(box);
    }
  }
}

const reset = (boxes: HTMLCollectionOf<Element>) => {
  console.log("reset called");
  Array.from(boxes).map(item => {
    item.innerHTML = ''
  })
  turn = 0;
  turnCount = 0;
  setPlayers();
  player1.style.animation = 'spin 10s linear infinite';
  player2.style.animation = '';
}

const resultShow = (content: string) => {
  const message: HTMLElement = document.getElementsByClassName('message')[0] as HTMLElement;
  const modal: HTMLElement = document.getElementsByClassName('result-modal')[0] as HTMLElement;
  message.textContent = content;
  modal.style.opacity = '1';
  modal.style.display = "flex";
  modal.style.zIndex = '99';
}

makeBoard(size);

const boxes = document.getElementsByClassName('box');

Array.from(boxes).map(item => {
  item.addEventListener('click', () => {
    if (item.innerHTML === '') {
      const row: number = parseInt(item.getAttribute('data-row') ?? '0');
      const col: number = parseInt(item.getAttribute('data-col') ?? '0');
      const box: HTMLElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLElement;
      if (turn === 0) {
        box.style.color = 'white';
        item.innerHTML = 'X';
        turn = 1;
        turnCount++;
        if (checkWin(size, row, col, 'X')) {
          const player1Span = player1.nextElementSibling as HTMLElement;
          resultShow(`${player1Span.innerHTML} WON!`)
        }
        else if (turnCount === size * size) {
          resultShow("Match Draw!")
        }
        player2.style.animation = 'spin 10s linear infinite';
        player1.style.animation = '';

        console.log(turnCount);
      }
      else {
        item.innerHTML = 'O';
        box.style.color = '#8f2d36';
        turn = 0;
        turnCount++;
        if (checkWin(size, row, col, 'O')) {
          const player2Span = player2.nextElementSibling as HTMLElement;
          resultShow(`${player2Span.innerHTML} WON!`)
        }
        else if (turnCount === size * size) {
          resultShow("Match Draw!")
        }
        player1.style.animation = 'spin 10s linear infinite';
        player2.style.animation = '';
        console.log(turnCount);

      }
    }
  })
})

const newGame: Element = document.getElementsByClassName('start-button')[0] as Element;

newGame.addEventListener('click', () => reset(boxes));

const startAgain: Element = document.getElementsByClassName('reset_btn')[0] as Element;

startAgain.addEventListener('click', () => {
  const modal: HTMLElement = document.getElementsByClassName('result-modal')[0] as HTMLElement;
  modal.style.display = 'none';
  reset(boxes);
});

const submitButton: HTMLElement = document.getElementById('nameForm') as HTMLElement;

submitButton.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log("submit called");
  const player1Name: HTMLInputElement = document.getElementById('player1Name') as HTMLInputElement;
  const player2Name: HTMLInputElement = document.getElementById('player2Name') as HTMLInputElement;

  const player1Span = player1.nextElementSibling as HTMLElement;
  player1Span.innerHTML = player1Name.value;
  player1Name.value = '';

  const player2Span = player2.nextElementSibling as HTMLElement;
  player2Span.innerHTML = player2Name.value;
  player2Name.value = '';

  const usernameModal: HTMLElement = document.querySelector('.username-modal') as HTMLElement;
  usernameModal.style.display = 'none';
})