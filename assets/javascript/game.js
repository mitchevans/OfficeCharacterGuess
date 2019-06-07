var characters = ["jim", "pam", "michael", "meredith", "stanley", "ryan",
    "toby", "dwight", "creed", "oscar", "darrel", "kevin"];

var chosenChar = ""

var lettersInChar = [];

var numOfBlanks = 0;

// variable to hold _ _ _ and correct letter guesses.
var blanksAndCorrect = [];

// array to hold letters guessed not in the character's name. 
var wrongGuesses = [];

// variable to hold current guessed letter.
var lettersGuessed = "";

var wins = 0;
var losses = 0;
var guessesLeft = 7;

function startGame() {


    // Reset the guesses back to 7.
    guessesLeft = 7;

    // Character chosen randomly from characters array.
    chosenChar = characters[Math.floor(Math.random() * characters.length)];

    // The character's name is broken into individual letters.
    lettersInChar = chosenChar.split("");

    // We count the number of letters in the name.
    numOfBlanks = lettersInChar.length;

    // We print the solution in console (for testing).
    //console.log(chosenChar);

    // Here we *reset* the guess and success array at each round.
    blanksAndCorrect = [];

    // Here we *reset* the wrong guesses from the previous round.
    wrongGuesses = [];

    // Fill up the blanksAndCorrect placeholder with appropriate number of blanks.
    for (var i = 0; i < numOfBlanks; i++) {
        blanksAndCorrect.push("_");
    }

    // Print the initial blanks in console.
    console.log(blanksAndCorrect);

    // Reprints the guessesLeft to 7.
    $("#guesses-left").text(guessesLeft);

    // Prints the blanks at the beginning of each round in the HTML.
    $("#word-blanks").text(blanksAndCorrect.join(" "));

    // Clears the wrong guesses from the previous round.
    $("#wrong-guesses").text(wrongGuesses.join(" "));
}

function checkLetters(letter) {

    // This boolean will be toggled based on whether or not
    // a user letter is found anywhere in the word.
    var letterInWord = false;

    // Check if a letter exists inside the array at all.
    for (var i = 0; i < numOfBlanks; i++) {

        if (chosenChar[i] === letter) {

            // If the letter exists then toggle this boolean to true.
            // This will be used in the next step.
            letterInWord = true;
        }
    }

    // If the letter exists somewhere in the word,
    // then figure out exactly where (which indices).
    if (letterInWord) {

        // Loop through the word
        for (var j = 0; j < numOfBlanks; j++) {

            // Populate the blanksAndSuccesses with every instance of the letter.
            if (chosenChar[j] === letter) {

                // Here we set specific blank spaces to equal the correct letter
                // when there is a match.
                blanksAndCorrect[j] = letter;
            }
        }

        // Log the current blanks and successes for testing.
        console.log(blanksAndCorrect);
    }

    // If the letter doesn't exist at all...
    else if (wrongGuesses.indexOf(letter) === -1) {

        // Then we add the letter to the list of wrong letters.
        wrongGuesses.push(letter);

        // We also subtract one of the guesses.
        guessesLeft--;

    }

}

// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made.
function roundComplete() {

    // First, log an initial status update in the console
    // telling us how many wins, losses, and guesses are left.
    console.log("WinCount: " + wins + " | LossCount: " + losses + " | NumGuesses: " + guessesLeft);

    // HTML UPDATES
    // ============

    // Update the HTML to reflect the new number of guesses.
    $("#guesses-left").text(guessesLeft);

    // This will print the array of guesses and blanks onto the page.
    $("#word-blanks").text(blanksAndCorrect.join(" "));

    // This will print the wrong guesses onto the page.
    $("#wrong-guesses").text(wrongGuesses.join(" "));

    // If our Word Guess string equals the solution.
    // (meaning that we guessed all the letters to match the solution)...
    if (lettersInChar.toString() === blanksAndCorrect.toString()) {

        // Add to the win counter
        wins++;
        // Give the user an alert
        $("#header-text").text("That's right! It's " + chosenChar + "!")
       
        // Update the win counter in the HTML
        $("#win-counter").text(wins);

        // Restart the game
        startGame();
    }

    // If we've run out of guesses
    else if (guessesLeft === 0) {

        // Add to the loss counter
        losses++;

        // Give the user an alert
        $("#header-text").text("No, it's " + chosenChar + ". Try again.");

        // Update the loss counter in the HTML
       $("#loss-counter").text(losses);

        // Restart the game
        startGame();

    }

}

// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================

// Starts the Game by running the startGame() function
startGame();

// Then initiates the function for capturing key clicks.
document.onkeyup = function (event) {

    // Converts all key clicks to lowercase letters.
    letterGuessed = String.fromCharCode(event.which).toLowerCase();

    // Runs the code to check for correct guesses.
    checkLetters(letterGuessed);

    // Runs the code that ends each round.
    roundComplete();
};

$("#reset-button").on("click", function () {
    // reset wins and losses to 0.
    wins = "";
    losses = "";
    $("#win-counter").text(wins);
    $("#loss-counter").text(losses);
    $("#header-text").text("The Office Character Guess")
    startGame();

})
