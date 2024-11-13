import { useState } from "react";
import { compare } from "./compare";


function Game({ username,onLogout }) {
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
     
    function handleGuessSubmit(e) {
        e.preventDefault();
    
        const secretWord = "RECAT";
    
        if (guess.length !== 5) {
            setMessage(`${guess} was not a valid word`);
        } else if (guess.toUpperCase() === secretWord) {
            setMessage(`${guess} is the secret word!`);
        } else {
            const commonLetters = compare(guess, secretWord);
            setMessage(`${guess} had ${commonLetters} letters in common`);
        }
    
        setGuess(''); 
    }
    
  
    return (
      <div>
        <p>Welcome, {username}!</p>
        <form className="game-form" onSubmit={handleGuessSubmit}>
            <p>Please enter a 5 letter word</p>
          <label>
            Enter your guess:
            <input
              type="text"
              className="input"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          </label>
          <button className="button" type="submit">Submit Guess</button>
        </form>
        {message && <p className="message">{message}</p>}
        
        <button className="button" onClick={onLogout}>Logout</button>
      </div>
    );
  }
  
  export default Game;
