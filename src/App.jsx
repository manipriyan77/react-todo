import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './components/Input/Input';
import ListTodos from './components/ListTodos/ListTodos';
import { todoActions } from './store/todoSlice';

import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const storedTodos = useSelector((state) => state.todo.todo);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
    dispatch(todoActions.initializeTodos(storedTodos));
  }, [dispatch]);
  return (
    <div className="bg-[#F8F6F4] h-full main_section flex justify-center">
      <div className="w-[500px] text-center">
        <h1 className="text-[62px] font-bold underline">todos</h1>
        <Input />
        {storedTodos.length > 0 && <ListTodos />}
      </div>
    </div>
  );
};

export default App;
