import React from 'react';

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface ToDoItemProps {
  todo: ToDo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  return (
    <li>
      <input
        type="text"
        value={todo.text}
        onChange={e => editTodo(todo.id, e.target.value)}
      />
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      {todo.dueDate && <span>Due: {todo.dueDate}</span>}
      {todo.priority && <span>Priority: {todo.priority}</span>}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default ToDoItem;