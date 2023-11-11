import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../../store/todoSlice';

const List = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((data) => data.todo.todo);
  const completedTodo = useSelector((data) => data.todo.completedTodos);

  function isCompletedHandler(e) {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      dispatch(todoActions.isCompleted(todo.id));
    } else {
      // If unchecked, remove the todo from the completedTodos array
      dispatch(todoActions.markIncomplete(todo.id));
    }
  }

  return (
    <>
      <li>
        <span>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              isCompletedHandler(e);
            }}
          />
        </span>
        {todo.value}
      </li>
    </>
  );
};

export default List;
