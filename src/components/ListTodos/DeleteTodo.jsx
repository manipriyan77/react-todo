import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../../store/todoSlice';

const DeleteTodo = ({ value }) => {
  const dispatch = useDispatch();
  return (
    <>
      <span onClick={() => dispatch(todoActions.deleteTodo(value))}>X</span>
    </>
  );
};

export default DeleteTodo;
