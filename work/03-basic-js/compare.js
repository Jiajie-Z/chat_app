"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY
  let sameLetters = 0;
  let tempWord = word.toLowerCase().split(""); 
  let tempGuess = guess.toLowerCase().split("");
  
  for( let i = 0; i < tempWord.length; i++ ){
    for ( let j = 0; j < tempGuess.length; j++){
      if (tempWord[i] === tempGuess[j]){
        sameLetters++;
        tempGuess.splice(j,1)
      }
    }
  }




  return sameLetters;
}
