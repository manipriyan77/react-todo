import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import List from './List';

const ListTodos = () => {
  const todoList = useSelector((state) => state.todo.todo);

  return (
    <>
      <ul>
        {todoList.map((todo) => {
          return <List todo={todo} key={todo.id} />;
        })}
      </ul>
      <section>
        {todoList.length} tasks to complete
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </section>
    </>
  );
};

export default ListTodos;
