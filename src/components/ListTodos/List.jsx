import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../../store/todoSlice';

const List = ({ todo, value }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((data) => data.todo.todo);
  const completedTodo = useSelector((data) => data.todo.completedTodos);

  function isCompletedHandler(e) {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      if (e.target.id === value) {
        setIsCompleted(true);
      }
      dispatch(todoActions.isCompleted(todo.id));
    } else {
      if (e.target.id === value) {
        setIsCompleted(false);
      }
      dispatch(todoActions.markIncomplete(todo.id));
    }
  }

  return (
    <>
      <li
        style={todo.isCompleted ? { textDecoration: 'line-through' } : {}}
        className="flex items-center justify-between"
      >
        <span className="w-[100%] flex justify-between">
          <input
            type="checkbox"
            checked={todo.isCompleted ? true : isChecked}
            onChange={(e) => {
              isCompletedHandler(e);
            }}
            id={value}
            className="w-[10%] toggle_checkbox"
          />
          <span className="w-[90%] text-left">{todo.value}</span>
          <span onClick={() => dispatch(todoActions.deleteTodo(value))}>X</span>
        </span>
      </li>
    </>
  );
};

export default List;
