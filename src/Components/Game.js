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
    let history = [];
    for(let i=0; i<props.numberOfDisks; i++){
      disks[0].push(i);
    }
    history.push(disks);
    this.state = {
      disks : disks,
      selected : null,
      move: 0,
      history: history
    };
  }

  handleClick(i){
    const disks = this.state.disks.slice();
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
      this.move();
    }
    this.setState({
      disks : disks,
      selected: null
    });
  }

  move(){
    let move = this.state.move;
    const history = this.state.history.splice();
    move++;
    history.push(this.state.disks);
    this.setState({
      history: history,
      move: move
    });
  }

  renderTower(i){
    let highlight = this.state.selected === i ? true : false;
    return <Tower key={i} disks={this.state.disks[i]}
     onClick={()=>this.handleClick(i)} highlight={highlight}
      totalDisks={this.props.numberOfDisks}/>
  }

  render() {
    return (
      <div className="Game">
        <div className="move">
          {this.state.move}
        </div>
        <div className="moveList">
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
