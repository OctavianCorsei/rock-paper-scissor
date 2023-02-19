
let choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getPlayerChoice() {
    let validInput = false;
    let playerChoice = undefined;
    while(!validInput){
        playerChoice = prompt('What is your choice?').toLocaleLowerCase();

        validInput = validatePlayerChoice(playerChoice);
        if(!validInput) console.log('Wrong input! please choose a valid one');
    }

    return playerChoice;
}

function validatePlayerChoice(playerChoice) {
    return choices.includes(playerChoice);
}

/*
playRound() starts with selection from both the computer and the player
if draw - start over the round
return true if player won and false if computer won
*/
function playRound() {
    playerSelection = getPlayerChoice();
    console.log(`player chose ${playerSelection}`);
    computerSelection = getComputerChoice();
    console.log(`computer chose ${computerSelection}`);
    

    if(computerSelection == playerSelection) {
        console.log('It\'s a draw! try again');
        playRound()
    }
    else if(computerSelection == 'rock' && playerSelection == 'paper') return true;
    else if(computerSelection == 'paper' && playerSelection == 'scissors') return true;
    else if(computerSelection == 'scissors' && playerSelection == 'rock') return true;
    else return false;

}

function game() {
    let scorePlayer = 0;
    let scoreComputer = 0;

    for(i=0; i < 5; i++) {
        let playerWon = playRound();
        if(playerWon) {
            scorePlayer ++;
            console.log(`round ${i + 1} was won by the player. Player ${scorePlayer} - ${scoreComputer} Computer`);
        }else {
            scoreComputer ++;
            console.log(`round ${i + 1} was won by the computer. Player ${scorePlayer} - ${scoreComputer} Computer`);
        }
    }
    if(scorePlayer > scoreComputer) console.log('Player won! Congrats.')
    else console.log('Better luck next time. Computer took the win.');
}

game();

