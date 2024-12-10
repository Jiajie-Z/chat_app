import Loading from './Loading';
import TodoItem from './TodoItem';

function Todos({
  todos,
  isTodoPending,
  lastAddedTodoId,
  onDeleteTodo,
  onToggleTodo,
  onUpdateNote,
}) {
  const SHOW = { 
    PENDING: 'pending',
    EMPTY: 'empty',
    TODOS: 'todos',
  };

  let show;
  if(isTodoPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(todos).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.TODOS;
  }
  
  return (
    <div className="content">
      { show === SHOW.PENDING && <Loading className="todos__waiting">Loading Todos...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No Todo Items yet, add one!</p>
      )}
      { show === SHOW.TODOS && (
        <ul className="todos">
          { Object.values(todos).map( todo => (
            <li className="todo" key={todo.id}>
              <TodoItem
                todo={todo}
                isLastAdded={lastAddedTodoId===todo.id}
                onDeleteTodo={onDeleteTodo}
                onToggleTodo={onToggleTodo}
                onUpdateNote={onUpdateNote}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todos;
