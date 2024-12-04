import React, { useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <h1>My ToDo App</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <ToDoList />
      </header>
    </div>
  );
}

export default App;