const wordDisplay = document.getElementById('word')
const guess = document.querySelector('.guess')
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImg = document.querySelector(".hang-box>img");
const _status = document.querySelector('.status');
const btn = document.getElementById('btn')
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;
const resetGame = () => {
    // Ressetting game 
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImg.src = "assets/img/hangman-0.svg";
    guess.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(button => button.disabled = false);
    _status.style.display='none'
}
const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(Math.floor(Math.random() * wordList.length));
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint>b").innerText = hint;
    resetGame();
}
const gameOver = (isVictory) => {
    // After game complete.. showing status with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    document.querySelector(".status>img").src = `assets/img/${isVictory ? 'victory' : 'lost'}.gif`;
    document.querySelector(".status>hgroup>h2").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    document.querySelector(".status>hgroup>p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    document.querySelector('.status').style.display='flex'
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].style.border="none"
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImg.src = `assets/img/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guess.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
btn.addEventListener("click", getRandomWord);


