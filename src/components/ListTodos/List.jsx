import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { todoActions } from '../../store/todoSlice';

const List = ({ todo, value }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [editedValue, setEditedValue] = useState(todo.value); // Track the edited value

  const dispatch = useDispatch();

  function isCompletedHandler(e) {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      dispatch(todoActions.isCompleted(todo.id));
    } else {
      dispatch(todoActions.markIncomplete(todo.id));
    }
  }

  return (
    <>
      <li className="flex items-center justify-between">
        <span className="w-[100%] flex justify-between list_container">
          <input
            type="checkbox"
            checked={todo.isCompleted ? true : isChecked}
            onChange={(e) => {
              isCompletedHandler(e);
            }}
            id={value}
            className="w-[10%] toggle_checkbox"
          />
          {isClicked ? (
            <input
              type="text"
              className="w-[90%] text-left"
              onBlur={() => {
                console.log('blur');
                setIsClicked(false);
                if (editedValue !== todo.value) {
                  dispatch(todoActions.editTodo({ id: todo.id, value: editedValue }));
                }
              }}
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)} // Update editedValue state on change
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  setIsClicked(false);
                  if (editedValue !== todo.value) {
                    dispatch(todoActions.editTodo({ id: todo.id, value: editedValue }));
                  }
                }
              }}
              autoFocus
            />
          ) : (
            <>
              <span
                className="w-[90%] text-left"
                onDoubleClick={() => setIsClicked(!isClicked)}
                style={todo.isCompleted ? { textDecoration: 'line-through' } : {}}
              >
                {todo.value}
              </span>
              <span
                className="font-bold text-red-600 cursor-pointer delete_todo"
                onClick={() => dispatch(todoActions.deleteTodo(value))}
              >
                X
              </span>
            </>
          )}
        </span>
      </li>
    </>
  );
};

export default List;
