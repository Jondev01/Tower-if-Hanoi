import React, { Component } from 'react';
import './App.css';
import Game from './Components/Game';

class App extends Component {
  constructor(){
    super();
    this.best = [0,1];
  }

  minimalMoves(disks){
    for(let i=this.best.length; i<= disks; i++){
      this.best.push(2*this.best[i-1]+1);
    }
    return this.best[disks];
  }
  render() {
    let numberOfDisks = 3;
    return (
      <div className="App">
      Best play {this.minimalMoves(numberOfDisks)}
        <Game numberOfDisks={numberOfDisks} />
      </div>
    );
  }
}

export default App;
