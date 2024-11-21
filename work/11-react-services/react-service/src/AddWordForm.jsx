import { useState } from 'react';

function AddWordForm({ onUpdateWord }) {

  const [ word, setWord ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); // Don't forget, confusion follows if form submits
    onUpdateWord(word);
    setWord('');
  }

  function onTyping(e) {
    setWord(e.target.value);
  }

  return (
    <form className="add__form" action="#/change" onSubmit={onSubmit}>
      <input className="add__word" value={word} onChange={onTyping}/>
      <button type="submit" className="add__button">Update</button>
    </form>
  );
}

export default AddWordForm;
