import React, { Component } from 'react';
import Tower from './Tower';

class Game extends Component {
  constructor(props){
    super(props);
    let disks = [
      [],
      [],
      []
    ];
    for(let i=0; i<props.numberOfDisks; i++){
      disks[0].push(i);
    }
    this.state = {
      disks : disks,
      selected : null,
      move: 0,
      history: [disks]
    };
  }

  handleClick(i){
    const disks = [this.state.disks[0].slice(), this.state.disks[1].slice(), this.state.disks[2].slice()];
    const history = this.state.history.slice();
    let move = this.state.move;
    let selected = this.state.selected;
    //if user has not previously selected a tower or selects the same tower again
    if(selected===null || i===selected){
      selected = disks[i].length>0 && i!==selected ? i : null;
      this.setState({
        selected : selected
      });
      return;
    }
    //Check if move is legal
    //index is at bottom is 0 and the largest disk has id 0
    if(disks[i].length === 0 || disks[i][disks[i].length-1] < disks[selected][disks[selected].length-1]){
      //perform move
      disks[i].push(disks[selected].pop());
      move++;
      if(move < history.length)
        history.splice(move);
      this.setState({
        history: history.concat([disks]),
        disks: disks,
        move: move
      });
    }
    this.setState({
      selected: null
    });
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
    return this.state.disks[2].length == this.props.numberOfDisks;
  }

  showSolution(start=0, end=2, number=this.props.numberOfDisks){
    //not finished
    if(number == this.props.numberOfDisks){
      this.setState( (state) => (
        {
        disks: state.history[0].slice(),
        move: 0,
        history: [state.history[0]]
      }));
    }
    if(number === 1){
      this.setState( (state) => this.moveDisk(start, end, state));
      return ;
    }
    let i = this.lastIndex(start, end);
    this.showSolution(start, i, number-1);
    this.setState( (state) => this.moveDisk(start, end, state));
    this.showSolution(i, end, number-1);

    if(number == this.props.numberOfDisks){
      this.setState( (state) => ({
        move: 0,
        disks: state.history[0].slice(),
        selected: null
      }));
      for(let j=0; j<this.props.minMoves; j++){
        let self = this;
        (function(x){
          setTimeout(()=>self.moveForward(), x*1000);
        })(j);
      }
    }
  }

  moveDisk(start, end, oldState){
    if(oldState.disks[end].length> 0 &&
      oldState.disks[end][oldState.disks[end].length-1] >
      oldState.disks[start][oldState.disks[start].length-1]){
        return oldState;
    }
    const disks = [
      oldState.disks[0].slice(),
      oldState.disks[1].slice(),
      oldState.disks[2].slice()
    ];
    disks[end].push(disks[start].pop());
    if(oldState.move+1 < oldState.history.length)
      oldState.history.splice(oldState.move);
    return {
      disks: disks,
      move: oldState.move+1,
      history: oldState.history.concat([disks])
    };
  }

  lastIndex(start, end){
    let i = 0;
    for(; i<3; i++){
      if(i != start && i != end)
        return i;
    }
  }

  renderTower(i){
    let highlight = this.state.selected === i ? true : false;
    return <Tower key={i} disks={this.state.disks[i]}
     onClick={()=>this.handleClick(i)} highlight={highlight}
      totalDisks={this.props.numberOfDisks}/>
  }

  render() {
    //if(this.gameWon())
    //  alert("You won");
    return (
      <div className="Game">
        <div className="move">
          {this.state.move}
        </div>
        <div className="moveList">
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
