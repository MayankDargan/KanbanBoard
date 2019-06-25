import React from 'react';
import HeaderComponent from './header/header';
import TaskBoard from './taskboard/taskboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <TaskBoard></TaskBoard>
    </div>
  );
}

export default App;
