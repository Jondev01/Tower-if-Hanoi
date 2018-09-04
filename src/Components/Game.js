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
    let move = this.state.move;
    const history = this.state.history.slice();
    if(move === 0)
      return;
    move--;
    this.setState({
      move: move,
      disks: history[move],
      selected: null
    });
  }

  moveForward(){
    let move = this.state.move;
    const history = this.state.history.slice();
    if(move === history.length-1)
      return;
    move++;
    this.setState({
      move: move,
      disks: history[move],
      selected: null
    });
  }

  gameWon(){
    return this.state.disks[2].length == this.props.numberOfDisks;
  }

  showSolution(start=0, end=2, number=this.props.numberOfDisks){
    //not finished
    if(number === 1){
      console.log("number is 1");
      console.log(start);
      console.log(end);
      this.moveDisk(start, end);
      return ;
    }
    if(number == this.props.numberOfDisks){
      this.setState({
        disks: this.state.history[0].slice()
      })
    }
    let i = this.lastIndex(start, end);
      this.showSolution(start, i, number-1);
      console.log("move disk");
      console.log(start,end);
      this.moveDisk(start, end);
      this.showSolution(i, end, number-1);
  }

  moveDisk(start, end){
    console.log("inside moveDisk");
    console.log(this.state.disks);
    if(this.state.disks[end].length> 0 &&
      this.state.disks[end][this.state.disks[end].length-1] >
      this.state.disks[start][this.state.disks[start].length-1]){
        console.log("Can't move disk");
        return ;
    }
    let startTower = this.state.disks[start].slice();
    let endTower = this.state.disks[end].slice();
    endTower.push(startTower.pop());
    let disks = [
      [],
      [],
      []
    ];
    disks[start] = startTower;
    disks[end] = endTower;
    let i = this.lastIndex(start, end);
    disks[i] = this.state.disks[i].slice();
    this.setState({
      disks: disks
    });
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
    if(this.gameWon())
      alert("You won");
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
