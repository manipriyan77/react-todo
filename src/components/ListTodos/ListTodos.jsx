import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from './List';
import { todoActions } from '../../store/todoSlice';

const ListTodos = () => {
  const allTodos = useSelector((state) => state.todo.todo);
  const activeTodos = useSelector((state) => state.todo.activeTodos);
  const completedTodos = useSelector((state) => state.todo.completedTodos);
  const currentState = useSelector((state) => state.todo.currentState);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    dispatch(todoActions.initializeTodos(storedTodos));
  }, [dispatch]);

  console.log('activeTodos :>> ', activeTodos);

  const currentTodo =
    currentState === 'all'
      ? allTodos
      : currentState === 'active'
      ? activeTodos
      : currentState === 'completed'
      ? completedTodos
      : [];
  return (
    <>
      <ul>
        {currentTodo.map((todo) => {
          return <List todo={todo} key={todo.id} value={todo.id} />;
        })}
      </ul>
      <section>
        {activeTodos.length} tasks to complete
        <div className="flex justify-between">
          <button
            className={currentState === 'all' ? 'active_button' : ''}
            onClick={() => dispatch(todoActions.setCurrentState('all'))}
          >
            All
          </button>
          <button
            className={currentState === 'active' ? 'active_button' : ''}
            onClick={() => dispatch(todoActions.setCurrentState('active'))}
          >
            Active
          </button>
          <button
            className={currentState === 'completed' ? 'active_button' : ''}
            onClick={() => dispatch(todoActions.setCurrentState('completed'))}
          >
            Completed
          </button>
          <button
            // className={currentState === 'all' && 'active_button'}
            onClick={() => dispatch(todoActions.clearCompleted())}
          >
            Clear completed
          </button>
        </div>
      </section>
    </>
  );
};

export default ListTodos;
