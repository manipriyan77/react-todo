import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Input from './components/Input/Input';
import ListTodos from './components/ListTodos/ListTodos';

const App = () => {
  const data = useSelector((data) => data.todo.todo);

  return (
    <div>
      <h1>todos</h1>
      <Input />
      {data.length > 0 && <ListTodos />}
    </div>
  );
};

export default App;
