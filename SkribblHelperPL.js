//Author: Ereno
//you can find me on Discord: Ereno#9339

//create window
var windowWithWords = document.createElement('div');
document.body.appendChild(windowWithWords);
windowWithWords.style = "position: absolute; top: 0px; right: 0px; width: 250px; height: 100%; background-color: rgba(0,0,0,0.3); color: rgba(255,255,255,0.5); font-size: 16px; overflow-y: scroll; overflow-x: hidden;)";

//set interval 0,5 second
setInterval(() => {
    var suggestedWords = "";
    //get current word to guess
    var word = document.getElementById("currentWord").innerText;

    //if word don't have _ char it means game not started or you are drawing, not typing
    if (word.includes("_") === false)
    {
        return false;
    }

    var possibleWordsTable = [];

    //switch case for possible words tables by length
    //TO DO: make it better!
    switch(word.length) 
    {
        case 2: possibleWordsTable = PossibleWordsPL_2; break;
        case 3: possibleWordsTable = PossibleWordsPL_3; break;
        case 4: possibleWordsTable = PossibleWordsPL_4; break;
        case 5: possibleWordsTable = PossibleWordsPL_5; break;
        case 6: possibleWordsTable = PossibleWordsPL_6; break;
        case 7: possibleWordsTable = PossibleWordsPL_7; break;
        case 8: possibleWordsTable = PossibleWordsPL_8; break;
        case 9: possibleWordsTable = PossibleWordsPL_9; break;
        case 10: possibleWordsTable = PossibleWordsPL_10; break;
        case 11: possibleWordsTable = PossibleWordsPL_11; break;
    } 

    //if word have space char, then we can limit list of words by first space index
    //TO DO: check also next spaces
    //TO DO: exclude words without spaces when there is space in guessing word
    //TO DO: check why it's excluding words slow (maybe 500ms interval)
    if (word.includes(" ") === true)
    {
        var indexOfSpace = word.indexOf(' ');
        for (var y in possibleWordsTable)
        {
            checkingWord = possibleWordsTable[y];
            if(checkingWord[indexOfSpace] != ' ')
            {
                possibleWordsTable.splice(possibleWordsTable.indexOf(checkingWord), 1);
            }
        }
    }

    //adding possibleWordsTable to window
    for (var x in possibleWordsTable)
    {
        suggestedWords += possibleWordsTable[x] + "<br>";
    }

    //...and show suggestedWords on window
    windowWithWords.innerHTML = suggestedWords;
},500);