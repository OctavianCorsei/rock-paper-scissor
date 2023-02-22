// alert ('working');

let choiceButtons = document.getElementById('player-choices');
let resetButton = document.getElementById('reset-button');

let playerName = prompt('What is your name?');

choiceButtons.addEventListener('click', choiceMade);
resetButton.addEventListener('click', resetGame);

let score = [0,0];
let overall = [0,0];
let gameLog = [];
let choices = ['rock', 'paper', 'scissors'];

function choiceMade(e) {
    let gameConsole = document.getElementById('game-console');
    if(e.target.type == 'submit') {
        let computerSelection = getComputerSelection();
        let playerSelection = e.target.getAttribute('data-value');
        gameConsole.textContent = '';
        gameConsole.appendChild(document.createTextNode(`${playerName} chose ${playerSelection} \n `));
        gameConsole.innerHTML += '  -  ';
        gameConsole.appendChild(document.createTextNode(`Computer chose ${computerSelection} \n `));

        let roundWinner = roundResult(computerSelection, playerSelection);

        if(roundWinner != 'draw')
            addGameLog(playerSelection, computerSelection, roundWinner);

        UpdateScore(roundWinner, gameConsole);
    }
} 

function UpdateScore(roundWinner, gameConsole){
    if(roundWinner == 'draw'){
        gameConsole.appendChild(document.createTextNode(` ---> It's a ${roundWinner} so nobody won!!`));
    }
    else if(roundWinner == 'player'){
        score[0] += 1;
        gameConsole.appendChild(document.createTextNode(` ---> ${playerName}  won and has ${score[0]} points`));
        if(score[0] == 5){
            gameConsole.innerHTML = `<h2>${playerName.toUpperCase()} WON THE GAME!!</h2>`;
            score = [0,0];
            overall[0] += 1;
            let overallScore = document.getElementById('overall-score');
            overallScore.textContent = '';
            overallScore.appendChild(document.createTextNode(`${playerName} ${overall[0]} - ${overall[1]} Computer`));
            document.getElementById('move-list').replaceChildren();
        }
    }
    else if(roundWinner == 'computer'){
        score[1] += 1;
        gameConsole.appendChild(document.createTextNode(` ---> ${roundWinner}  won and has ${score[1]} points`));
        if(score[1] == 5){
            gameConsole.innerHTML = '<h2>COMPUTER WON THE GAME!!</h2>';
            score = [0,0];
            overall[1] += 1;
            let overallScore = document.getElementById('overall-score');
            overallScore.textContent = '';
            overallScore.appendChild(document.createTextNode(`${playerName} ${overall[0]} - ${overall[1]} Computer`));
            document.getElementById('move-list').replaceChildren();
        }
    }
    updateScoreboard();
}

function addGameLog(playerSelection, computerSelection, roundWinner){
    let gameLog = document.getElementById('move-list');
    let roundInstance = document.createElement('li');
    if(roundWinner == 'player'){
        roundInstance.textContent = `${playerSelection} --> ${computerSelection}; ${playerName} Wins!`;

    }else{
        roundInstance.textContent = `${playerSelection} <-- ${computerSelection}; Computer Wins!`;
    }
    gameLog.appendChild(roundInstance);
}

function getComputerSelection() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function roundResult (computerSelection, playerSelection) {
    if(computerSelection == playerSelection) return 'draw';
    else if(computerSelection == 'rock' && playerSelection == 'scissors') return 'computer';
    else if(computerSelection == 'paper' && playerSelection == 'rock') return 'computer';
    else if(computerSelection == 'scissors' && playerSelection == 'paper') return 'computer';
    else return 'player';
}

function updateScoreboard (){
    document.getElementById('player-score').textContent = `${playerName}'s score: ${score[0]}`;
    document.getElementById('computer-score').textContent = `Computer score: ${score[1]}`;
}

function checkWin(pointsTo){
    return score[0] == pointsTo || score[1] == pointsTo;
}

function resetGame(e){
    //reset score 
    score = [0,0];
    updateScoreboard();
    
    //clean gameLog
    document.getElementById('move-list').replaceChildren();

    //clean gameConsole
    document.getElementById('game-console').textContent = '';
    
    //ask again for name
    playerName = prompt('What is your name?');
}