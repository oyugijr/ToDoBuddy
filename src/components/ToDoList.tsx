// src/components/ToDoList.tsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToDoItem from './ToDoItem';
import AddToDo from './AddToDo';
import FilterButtons from './FilterButtons';

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const now = new Date();
    todos.forEach(todo => {
      if (todo.dueDate) {
        const dueDate = new Date(todo.dueDate);
        const timeDiff = dueDate.getTime() - now.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        if (daysDiff <= 1 && !todo.completed) {
          alert(`Task "${todo.text}" is due soon!`);
        }
      }
    });
  }, [todos]);

  const addTodo = (text: string, dueDate?: string, priority?: 'low' | 'medium' | 'high') => {
    setTodos([...todos, { id: Date.now(), text, completed: false, dueDate, priority }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  }).filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()));

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  return (
    <div>
      <h2>ToDo List</h2>
      <input
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <AddToDo addTodo={addTodo} />
      <FilterButtons setFilter={setFilter} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ToDoItem
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ToDoList;