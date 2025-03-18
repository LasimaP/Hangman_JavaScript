// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');
//import input from "sync-input";

const wordList = ["python", "java", "swift", "javascript"];
let attempts = 8;
let wins = 0;
let losses = 0;
let quit = false;

console.log("H A N G M A N");

while (!quit) {
    let option = menu();
    switch (option) {
        case "play":
            playGame(wordList);
            break;
        case "results":
            results();
            break;
        case "exit":
            quit = true;
            break;
        default:
            break;
    }
}



function menu() {
    return input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `);
}

function results() {
    console.log(`You won: ${wins} times.\nYou lost: ${losses} times.`);
}

function playGame(wordList) {
    const index = Math.floor(Math.random() * wordList.length);
    const word = wordList[index];
    let hiddenWord = hideWord(word);
    let won = false;

    console.log("\n" + hiddenWord);

    let hiddenArray = Array.from(hiddenWord);
    let guessedLetters = [];
    while (attempts > 0) {
        let guess = input("Input a letter: ");
        if (inputCheck(guess, guessedLetters)) {
            hiddenArray = unveilLetter(guess, word, hiddenArray);
            guessedLetters.push(guess);
        }

        let currentGuess = hiddenArray.join("");
        if (currentGuess === word) {
            console.log(`\nYou guessed the word ${word}!`);
            won = true;
            break;
        }

        if (attempts > 0) {
            console.log("\n" + currentGuess);
        }


    }
    won ? wins++ : losses++;
    won ? console.log("You survived!") : console.log("You lost!");
}

function hideWord(word) {
    let h = "";
    for (let i = 0; i <word.length; i++) {
        h += "-";
    }
    return h;
}

function unveilLetter(letter, word, hiddenArray) {
    if (word.includes(letter)) {
        if (hiddenArray.includes(letter)) {
            console.log("No improvements.");
            attempts--;
        } else {
            for (let i = 0; i < word.length; i++) {
                if (letter === word[i]) {
                    hiddenArray[i] = letter;
                }
            }
        }

    } else {
        console.log("That letter doesn't appear in the word.")
        attempts--;
    }
    return hiddenArray;
}

function inputCheck(letter, letterList) {
    const regex = /[A-Z\W\d_]/;
    if (letter.length > 1) {
        console.log("Please, input a single letter.");
        return false;
    } else if (letter.length === 0 || regex.test(letter)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
        return false;
    } else if (letterList.indexOf(letter) !== -1) {
        console.log("You've already guessed this letter.");
        return false;
    }
    return true;
}
