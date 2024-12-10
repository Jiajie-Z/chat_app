import { randomUUID as uuid } from 'crypto';

export function makeTodoList() {
  const id2 = uuid();

  const todoList = {};
  const todos = {
    [id2]: {
      id: id2,
      task: 'final project for info 6250',
      done: true,
      dueDate: new Date('2024-12-10').toISOString(),
    },
  };

  todoList.contains = function contains(id) {
    return !!todos[id];
  };

  todoList.getTodos = function getTodos() {
    return todos;
  };

  todoList.addTodo = function addTodo(task, dueDate = null) {
    const id = uuid();
    todos[id] = {
      id,
      task,
      done: false,
      dueDate,
    };
    return id;
  };

  todoList.getTodo = function getTodo(id) {
    return todos[id];
  };

  todoList.updateTodo = function updateTodo(id, { done, task, dueDate, note}) {
    if (!todos[id]) return false;
    todos[id] = {
      ...todos[id],
      done: done ?? todos[id].done,
      task: task ?? todos[id].task,
      dueDate: dueDate ?? todos[id].dueDate,
      note: note ?? todos[id].note,
    };
    return true;
  };


  todoList.deleteTodo = function deleteTodo(id) {
    delete todos[id];
  };

  return todoList;
}
