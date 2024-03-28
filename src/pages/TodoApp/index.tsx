import React, { useEffect, useRef, useState } from 'react';
import DeleteIcon from '../../components/common/icons/DeleteIcon';
import CheckIcon from './icons/CheckIcon';
import './index.css';

export interface TodoAppProps {}

interface Todo {
  val: string;
  id: number;
  status: 'done' | 'inprogress';
}

const TodoApp: React.FC<TodoAppProps> = () => {
  const [inputVal, setInputVal] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lsTodoLen, setLsTodoLen] = useState({ len: 0, state: false });
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ls = window.localStorage;
    const todoLs = ls.getItem('todos');
    if (todoLs) {
      const parsedTodos = JSON.parse(todoLs) as Todo[];
      setLsTodoLen({ len: parsedTodos.length, state: true });
      setTodos(parsedTodos);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const updateLsWithTodos = () => {
    const ls = window.localStorage;
    ls.setItem('todos', JSON.stringify(todos));
  };

  useEffect(() => {
    if (lsTodoLen.state) {
      updateLsWithTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, lsTodoLen]);

  const handleUpdateTodos = (todoVals: Todo[]) => {
    setTodos(todoVals);
    inputRef.current?.focus();
  };

  const handleTodoAdd = () => {
    const value = inputVal.trim();
    if (!value) {
      return;
    }

    // check for duplicacy
    const itemFnd = todos.find((item) => item.val === value);

    if (itemFnd) {
      return;
    }

    const todoItem: Todo = {
      val: value,
      id: Date.now(),
      status: 'inprogress',
    };

    const updatedTodos = [...todos, todoItem];
    handleUpdateTodos(updatedTodos);
    setInputVal('');
  };

  const handleInputChange = (evt: React.SyntheticEvent) => {
    const val = (evt.target as HTMLInputElement).value;
    setInputVal(val);
  };

  const handleToggleStatus = (item: Todo) => {
    const updatedTodos: Todo[] = todos.map((todo) => {
      if (todo.id === item.id) {
        if (item.status === 'done') {
          return {
            ...todo,
            status: 'inprogress',
          };
        }
        return {
          ...todo,
          status: 'done',
        };
      }

      return todo;
    });

    handleUpdateTodos(updatedTodos);
  };

  const handleDeleteTodo = (item: Todo) => {
    const todoItems = todos.filter((todo) => todo.id !== item.id);
    handleUpdateTodos(todoItems);
  };

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          ref={inputRef}
          value={inputVal}
          id="todo"
          onChange={handleInputChange}
          required
          placeholder="Type your todo here!"
          name="todo"
          className="form-control"
        />
      </div>
      <button
        type="button"
        onClick={handleTodoAdd}
        className="btn btn-sm btn-primary"
      >
        Add
      </button>
      <div className="todo-list-container">
        <ul className="list-group">
          {todos.map((item) => (
            <li className="list-group-item" key={item.id}>
              <button
                type="button"
                style={{ height: '20px', width: '20px' }}
                className="btn btn-sm rounded-circle border border-primary"
                onClick={() => handleToggleStatus(item)}
              >
                {item.status === 'done' ? <CheckIcon /> : null}
              </button>
              <span
                className={
                  item.status === 'done' ? 'text-decoration-line-through' : ''
                }
              >
                {' '}
                {item.val}{' '}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteTodo(item)}
                className="btn btn-sm btn-outline-danger"
              >
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
