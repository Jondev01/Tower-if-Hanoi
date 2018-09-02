import React, { Component } from 'react';
import './App.css';
import Game from './Components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game disks="3" />
      </div>
    );
  }
}

export default App;
