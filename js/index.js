var size = 3;
var turn = 0;
var turnCount = 0;
var player1 = document.querySelector('#player1');
var player2 = document.querySelector('#player2');
player1.style.animation = 'spin 10s linear infinite';
var setPlayers = function () {
    console.log("setplayers called");
    var usernameModal = document.querySelector('.username-modal');
    usernameModal.style.display = 'flex';
};
var checkWin = function (size, row, col, characterSymbol) {
    var _a, _b, _c, _d;
    //diagonal check
    if (row === col) {
        var diaFlag = true;
        for (var i = 0, j = 0; i < size; i++, j++) {
            if (((_a = document.querySelector("[data-row=\"".concat(i, "\"][data-col=\"").concat(j, "\"]"))) === null || _a === void 0 ? void 0 : _a.innerHTML) !== characterSymbol) {
                diaFlag = false;
            }
        }
        if (diaFlag)
            return diaFlag;
    }
    //non-diagonal check
    if (row + col === size - 1) {
        var nonDiaFlag = true;
        for (var i = 0, j = size - 1; i < size; i++, j--) {
            if (((_b = document.querySelector("[data-row=\"".concat(i, "\"][data-col=\"").concat(j, "\"]"))) === null || _b === void 0 ? void 0 : _b.innerHTML) !== characterSymbol) {
                nonDiaFlag = false;
            }
        }
        if (nonDiaFlag)
            return nonDiaFlag;
    }
    // horizontal and vertical check
    var horFlag = true;
    var verFlag = true;
    for (var i = 0; i < size; i++) {
        if (((_c = document.querySelector("[data-row=\"".concat(i, "\"][data-col=\"").concat(col, "\"]"))) === null || _c === void 0 ? void 0 : _c.innerHTML) !== characterSymbol) {
            verFlag = false;
        }
        if (((_d = document.querySelector("[data-row=\"".concat(row, "\"][data-col=\"").concat(i, "\"]"))) === null || _d === void 0 ? void 0 : _d.innerHTML) !== characterSymbol) {
            horFlag = false;
        }
    }
    if (horFlag || verFlag)
        return true;
    return false;
};
var makeBoard = function (size) {
    setPlayers();
    var gameBoard = document.querySelector('#board');
    gameBoard.style.gridTemplateColumns = "repeat(".concat(size, ", 1fr)");
    gameBoard.style.gridTemplateRows = "repeat(".concat(size, ", 1fr)");
    for (var row = 0; row < size; row++) {
        for (var col = 0; col < size; col++) {
            var box = document.createElement('div');
            box.classList.add('box');
            box.setAttribute('data-row', row.toString());
            box.setAttribute('data-col', col.toString());
            gameBoard.appendChild(box);
        }
    }
};
var reset = function (boxes) {
    console.log("reset called");
    Array.from(boxes).map(function (item) {
        item.innerHTML = '';
    });
    turn = 0;
    turnCount = 0;
    setPlayers();
};
var resultShow = function (content) {
    var message = document.getElementsByClassName('message')[0];
    var modal = document.getElementsByClassName('result-modal')[0];
    message.textContent = content;
    modal.style.opacity = '1';
    modal.style.display = "flex";
    modal.style.zIndex = '99';
};
makeBoard(size);
var boxes = document.getElementsByClassName('box');
Array.from(boxes).map(function (item) {
    item.addEventListener('click', function () {
        var _a, _b;
        if (item.innerHTML === '') {
            var row = parseInt((_a = item.getAttribute('data-row')) !== null && _a !== void 0 ? _a : '0');
            var col = parseInt((_b = item.getAttribute('data-col')) !== null && _b !== void 0 ? _b : '0');
            var box = document.querySelector("[data-row=\"".concat(row, "\"][data-col=\"").concat(col, "\"]"));
            if (turn === 0) {
                box.style.color = 'white';
                item.innerHTML = 'X';
                turn = 1;
                turnCount++;
                if (checkWin(size, row, col, 'X')) {
                    var player1Span = player1.nextElementSibling;
                    resultShow("".concat(player1Span.innerHTML, " WON!"));
                }
                else if (turnCount === size * size) {
                    resultShow("Match Draw!");
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
                    var player2Span = player2.nextElementSibling;
                    resultShow("".concat(player2Span.innerHTML, " WON!"));
                }
                else if (turnCount === size * size) {
                    resultShow("Match Draw!");
                }
                player1.style.animation = 'spin 10s linear infinite';
                player2.style.animation = '';
                console.log(turnCount);
            }
        }
    });
});
var newGame = document.getElementsByClassName('start-button')[0];
newGame.addEventListener('click', function () { return reset(boxes); });
var startAgain = document.getElementsByClassName('reset_btn')[0];
startAgain.addEventListener('click', function () {
    var modal = document.getElementsByClassName('result-modal')[0];
    modal.style.display = 'none';
    reset(boxes);
});
var submitButton = document.getElementById('nameForm');
submitButton.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("submit called");
    var player1Name = document.getElementById('player1Name');
    var player2Name = document.getElementById('player2Name');
    var player1Span = player1.nextElementSibling;
    player1Span.innerHTML = player1Name.value;
    player1Name.value = '';
    var player2Span = player2.nextElementSibling;
    player2Span.innerHTML = player2Name.value;
    player2Name.value = '';
    var usernameModal = document.querySelector('.username-modal');
    usernameModal.style.display = 'none';
});
