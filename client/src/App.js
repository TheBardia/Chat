import React from 'react';
import './App.css';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Bardia's Incredible Chat App! Now it works!
        </p>
        <ChatContainer />
      </header>
    </div>
  );
}

export default App;
