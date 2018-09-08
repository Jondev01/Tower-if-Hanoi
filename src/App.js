import React, { Component } from 'react';
import './App.css';
import Game from './Components/Game';

class App extends Component {

  render() {
    let numberOfDisks = 3;
    return (
      <div className="App">
        <header>
          <h1>Tower of Hanoi</h1>
        </header>
        <Game/>
      </div>
    );
  }
}

export default App;
