// Tic Tac Toe Game .....
let allSquares = Array.from(document.querySelectorAll('.game div')),
player = document.querySelector('#player'),
gameBoard = document.querySelector('#game-board'),
turn =  'X',
gameBtn = document.querySelector('.new'),
countRound = 0,


// Create Click Sound Effect ....
clickSound = document.createElement('audio');
clickSound.setAttribute('src', 'sounds/click.wav');
document.querySelector('body').appendChild(clickSound);

// Create gameOver Sound Effect ....
gameOverSound = document.createElement('audio');
gameOverSound.setAttribute('src', 'sounds/game_over.wav');
document.querySelector('body').appendChild(gameOverSound);



// Click Event to all Elements ....
allSquares.forEach((el) => {
    el.onclick = function(){
        startGame(el);
    };
    
});

const startGame = (el) => {
    clickSound.play();
    player.innerHTML = el.innerHTML == '' && 
    ( turn == 'X' ? (el.innerHTML = 'X', turn = 'O') 
    : (el.innerHTML = 'O', turn = 'X') );

    el.onclick = null;
    countRound ++;
    winningState();
};

const winningPatterns = [
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [2 , 4 , 6],
    [0 , 4 , 8],
];

const winningState = () => {
    for(i of winningPatterns){
        let [a, b, c] = [
            allSquares[i[0]].innerHTML,
            allSquares[i[1]].innerHTML,
            allSquares[i[2]].innerHTML
        ];

        if(a != '' && a === b && b === c){
            turn = a;
            winner(i);
            return
        };
    };

    if(countRound == 9){
        draw()
    };
};

const winner = (winningSquares) => {
    gameOverSound.play();
    // Declaring Winner ....
    gameBoard.innerHTML = `Winner is ${turn} ...`;
    player.innerHTML = '';

    // Changing BackGround Color For Winning Squares ....
    for ( el of winningSquares ){
        allSquares[el].classList.add('winSquare');
    }

    // Disable all buttons ....
    disableButtons();
};

const draw = () => {
    gameOverSound.play();
    gameBoard.innerHTML = `It's a Draw! Try Again...`;
    player.innerHTML = '';


    allSquares.forEach(el => {
        el.classList.add('draw');
    });
}

const disableButtons = () => {
    allSquares.forEach(el => {
        el.onclick = null;
    })
}

// reStart Game .....
gameBtn.onclick = () => {
    countRound = 0;
    turn = 'X';

    allSquares.forEach(el => {
        el.innerHTML = '';
        el.removeAttribute('class')
        el.onclick = function(){
            startGame(el);
        };

        gameBoard.innerHTML = 'Player: ';
        player.innerHTML = 'X';
    })
};
