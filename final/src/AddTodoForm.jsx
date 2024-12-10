import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {

  const [ task, setTask ] = useState('');
  const [ dueDate, setDueDate ] = useState('');
  const [error, setError] = useState('');

  function validateDueDate(date) {
    
    const today = new Date();
    const selectedDate = new Date(date);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return 'Due date cannot be in the past.';
    }

    return '';
  }

  function onSubmit(e) {
    e.preventDefault(); 
    const errorMsg = validateDueDate(dueDate);

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setTask('');
    setDueDate('');
    setError('');
    onAddTodo(task, dueDate);
  }

  function onTyping(e) {
    setTask(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <input className="add__task" value={task} onChange={onTyping} placeholder='Add todo (optional due date)'/>
      <input className="add__due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <button type="submit" className="add__button">Add</button>
    </form>
  );
}

export default AddTodoForm;
