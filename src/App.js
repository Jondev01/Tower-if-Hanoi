import React, { Component } from 'react';
import './App.css';
import Game from './Components/Game';

class App extends Component {
  constructor(){
    super();
  }

  minimalMoves(disks){
    if( typeof this.minimalMoves.arr === 'undefined')
      this.minimalMoves.arr = [0,1];
    for(let i=this.minimalMoves.arr.length; i<= disks; i++){
      this.minimalMoves.arr.push(2*this.minimalMoves.arr[i-1]+1);
    }
    return this.minimalMoves.arr[disks];
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
