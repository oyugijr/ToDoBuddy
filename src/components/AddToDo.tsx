import React, { useState } from 'react';

interface AddToDoProps {
  addTodo: (text: string, dueDate?: string, priority?: 'low' | 'medium' | 'high') => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    addTodo(newTodo, dueDate, priority);
    setNewTodo('');
    setDueDate('');
    setPriority('low');
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddToDo;