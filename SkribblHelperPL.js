//Author: Ereno
//you can find me on Discord: Ereno#9339

// Create a window for displaying hints
document.body.appendChild(Object.assign(
    document.createElement('div'), {
        id: 'hintslist',
        style: `
            position: absolute;
            top: 0px;
            right: 0px;
            width: 250px;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            color: rgba(255, 255, 255, 0.5);
            font-size: 16px;
            overflow-y: scroll;
            overflow-x: hidden;
        `
    }
  ));

function HintsList(){
    // Select the container element that holds the hints
    const gameWord = document.querySelector(".hints>.container");

    // Check if the container element exists
    if(!gameWord.innerHTML){
        return false;
    }

    // Select all child elements with the class 'hint'
    const hints = gameWord.querySelectorAll(".hint");

    // Build the 'word' string from the text of 'hint' elements
    const word = Array.from(hints)
        .map(hint => hint.textContent)
        .join('');

    // Check if 'word' contains "_" or if it is empty
    if (!word.includes("_")) {
        document.querySelector('#hintslist').innerHTML = ""; // Clear hintsList if 'word' does not meet the conditions
        return;
    }

    // Determine possible words based on the length of 'word'
    const possibleWordsTable = (word.length >= 1 && word.length <= 25) 
        ? PossibleWordsPL[word.length - 1] 
        : []; // Default to empty array if the word length is out of range

    // Collect positions of spaces and letters in 'word'
    const spacesInWord = [];
    const lattersOrSpacesInWord = [];

    for (let i = 0; i < word.length; i++) {
        if (word[i] !== '_') {
            lattersOrSpacesInWord.push([i, word[i]]);
            if (word[i] === ' ') {
                spacesInWord.push([i, word[i]]);
            }
        }
    }

    // Filter possible words if there are no spaces in 'word'
    if (spacesInWord.length === 0) {
        for (let i = 0; i < possibleWordsTable.length; i++) {
            const checkingWord = possibleWordsTable[i];
            if (checkingWord.includes(' ')) {
                possibleWordsTable.splice(i, 1);
                i--; // Adjust the index after removal
            }
        }
    }

    // Filter possible words by index of spaces and letters in 'word'
    if (lattersOrSpacesInWord.length > 0) {
        for (let y = 0; y < possibleWordsTable.length; y++) {
            const checkingWord = possibleWordsTable[y];
            let isValid = true;
            for (let j = 0; j < lattersOrSpacesInWord.length; j++) {
                const [index, letter] = lattersOrSpacesInWord[j];
                if (checkingWord[index] !== letter) {
                    isValid = false;
                    break;
                }
            }
            if (!isValid) {
                possibleWordsTable.splice(y, 1);
                y--; // Adjust the index after removal
            }
        }
    }

    // Create the string of suggested words
    const suggestedWords = possibleWordsTable.join("<br>");

    // Display the suggested words in the window
    document.querySelector('#hintslist').innerHTML = suggestedWords;
};

const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            HintsList();
        }
    }
};
const config = {childList: true,subtree: true};
const observer = new MutationObserver(callback);
const targetNode = document.querySelector(".hints>.container");
observer.observe(targetNode, config);
