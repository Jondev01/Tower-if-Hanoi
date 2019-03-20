import React, { Component } from 'react';
import Tower from './Tower';
import './Game.css';

class Game extends Component {
  constructor(props){
    super(props);
    let disks = [
      [],
      [],
      []
    ];
    let numberOfDisks = props.numberOfDisks ? props.numberOfDisks : 3;

    for(let i=0; i<numberOfDisks; i++){
      disks[0].push(i);
    }
    this.state = {
      disks : disks,
      selected : null,
      move: 0,
      history: [disks],
      numberOfDisks: numberOfDisks,
      minMoves: this.minimalMoves(numberOfDisks)
    };
  }

  minimalMoves(number){
    if( typeof this.minimalMoves.arr === 'undefined')
      this.minimalMoves.arr = [0,1];
    for(let i=this.minimalMoves.arr.length; i<= number; i++){
      this.minimalMoves.arr.push(2*this.minimalMoves.arr[i-1]+1);
    }
    return this.minimalMoves.arr[number];
  }

  handleClick(i){
    let selected = this.state.selected;
    //if user has not previously selected a tower
    if(selected===null){
      this.setState( (state) => ({
        selected : state.disks[i].length>0  ? i : null
      }));
      return;
    }
    //move disk
    this.setState( (state) => this.moveDisk(selected, i, state));
  }

  moveBack(){
    this.setState(function(state){
      let move = state.move;
      const history = state.history.slice();
      if(move === 0)
        return state;
      move--;
      return{
        move: move,
        disks: history[move],
        selected: null
      };
    });
  }

  moveForward(){
    this.setState(function(state){
      let move = state.move;
      const history = state.history.slice();
      if(move === history.length-1)
        return state;
      move++;
      return{
        move: move,
        disks: history[move],
        selected: null
      };
    });
  }

  gameWon(){

    return this.state.disks[2].length == this.state.numberOfDisks;
  }

  showSolution(start=0, end=2, number=this.state.numberOfDisks){
    //not finished
    let buttons = document.getElementsByTagName('button');
    if(number == this.state.numberOfDisks){
      this.setState( (state) => (
        {
        disks: state.history[0].slice(),
        move: 0,
        history: [state.history[0]]
      }));
      for(let button of buttons){
        button.disabled = true;
      }
      document.getElementById('numberOfDisks').disabled = true;
    }
    if(number === 1){
      this.setState( (state) => this.moveDisk(start, end, state));
      return ;
    }
    let i = this.lastIndex(start, end);
    this.showSolution(start, i, number-1);
    this.setState( (state) => this.moveDisk(start, end, state));
    this.showSolution(i, end, number-1);

    if(number == this.state.numberOfDisks){
      this.setState( (state) => ({
        move: 0,
        disks: state.history[0].slice(),
        selected: null
      }));
      for(let j=0; j<this.state.minMoves; j++){
        let self = this;
        (function(x){
          setTimeout(()=>{
            self.moveForward();
            if(j==self.state.minMoves-1){
              for(let button of buttons)
                button.disabled = false;
              document.getElementById('numberOfDisks').disabled = false;
            }
            }, self.state.numberOfDisks <=5 ? (x+1)*1000 : (x+1)*20000/self.state.minMoves);
        })(j);
      }
    }
  }

  moveDisk(start, end, oldState){
    if(start === end || (oldState.disks[end].length> 0 &&
      oldState.disks[end][oldState.disks[end].length-1] >
      oldState.disks[start][oldState.disks[start].length-1])){
        return {
          ...oldState,
          selected: null
        }
    }
    const disks = [
      oldState.disks[0].slice(),
      oldState.disks[1].slice(),
      oldState.disks[2].slice()
    ];
    disks[end].push(disks[start].pop());
    let move = oldState.move +1;
    if(move < oldState.history.length)
      oldState.history.splice(move);
    return {
      disks: disks,
      move: move,
      history: oldState.history.concat([disks]),
      selected: null
    };
  }

  lastIndex(start, end){
    let i = 0;
    for(; i<3; i++){
      if(i != start && i != end)
        return i;
    }
  }

  restart(){
    this.setState(function(state){
        let value = document.getElementById('numberOfDisks').value
        let numberOfDisks = value>0 && value<=5 ? value : 3;
        let disks = [
          [],
          [],
          []
        ];
        for(let i=0; i<numberOfDisks; i++){
            disks[0].push(i);
        }
        return {
          disks: disks,
          selected: null,
          move: 0,
          history: [disks],
          numberOfDisks: numberOfDisks,
          minMoves: this.minimalMoves(numberOfDisks)
        };
    });
  }

  renderTower(i){
    let highlight = this.state.selected === i ? true : false;
    return <Tower key={i} disks={this.state.disks[i]}
     onClick={()=>this.handleClick(i)} highlight={highlight}
      totalDisks={this.state.numberOfDisks}/>
  }

  render() {
    if(this.gameWon())
      alert("You won");
    return (
      <div className="Game">
      <div className="info">
        Number of Disks: <input id="numberOfDisks" type="number" name="Number of Disks" onChange={() =>this.restart()}
         placeholder="3" min="1" max="5"/>
        <div className="move">
          Moves: {this.state.move}
        </div>
        <div className="best-play">
          Best play: {this.minimalMoves(this.state.numberOfDisks)}
        </div>
        <br/>
        <button onClick={() => this.restart()}>Restart</button>
        <button onClick={() => this.moveBack()}>Back</button>
        <button onClick={() => this.moveForward()}>Forward</button>
        <button onClick={() => this.showSolution()}>Solution</button>
      </div>
        <div className="Towers">
          {this.renderTower(0)}
          {this.renderTower(1)}
          {this.renderTower(2)}
        </div>
      </div>
    );
  }
}

export default Game;
