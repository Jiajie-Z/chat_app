function TodoItem({
  todo,
  isLastAdded,
  onDeleteTodo,
  onToggleTodo,
  onUpdateNote,
}) {
  const isDoneClass = todo.done ? "todo__text--complete" : "";
  const isAddedClass = isLastAdded ? "todo__text--added" : "";

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.done;
  const isOverdueClass = isOverdue ? "todo__text--overdue" : "";
  const handleNoteChange = (e) => {
    onUpdateNote(todo.id, e.target.value);
  };

  return (
    <>
      <label>
        <input
          className="todo__toggle"
          data-id={todo.id}
          type="checkbox"
          checked={todo.done}
          onChange={(e) => {
            const id = e.target.dataset.id;
            onToggleTodo(id);
          }}
        />
        <span
          data-id={todo.id}
          className={`todo__toggle todo__text ${isDoneClass} ${isAddedClass} ${isOverdueClass}`}
        >
          {todo.task}
          {todo.dueDate && (
            <span className="todo__due-date">
              {" "}
              (Due: {new Date(todo.dueDate).toLocaleDateString()})
            </span>
          )}
        </span>
      </label>
      <textarea
        className="todo__note"
        value={todo.note || ''}
        onChange={handleNoteChange}
        placeholder="Add a note..."
      />
      <button
        data-id={todo.id}
        className="todo__delete"
        onClick={(e) => {
          const id = e.target.dataset.id;
          onDeleteTodo(id);
        }}
      >
        &#10060;
      </button>
    </>
  );
}

export default TodoItem;
