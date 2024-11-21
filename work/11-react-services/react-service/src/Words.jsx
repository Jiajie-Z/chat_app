function Words( { storedWord }) {

  return (
      <div className="stored__word">
          {   storedWord ?
              <p>Your stored word is <i>{storedWord}</i>.</p>
          :
              <p>You don't have any word stored.</p>
          }
      </div>
  );
}

export default Words;