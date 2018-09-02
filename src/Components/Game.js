import React, { Component } from 'react';
import Tower from './Tower';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      disks : [
        [],
        [],
        []
      ],
      selected : null
    };
    for(let i=0; i<props.disks; i++){
      this.state.disks[0].push(i);
    }
  }

  handleClick(i){
    const disks = this.state.disks.slice();
    let selected = this.state.selected;
    //if user has not previously selected a tower or selects the same tower again
    if(selected===null || i===selected){
      selected = disks[i].length>0 ? i : null;
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
    }
    this.setState({
      disks : disks,
      selected: null
    });
  }

  renderTower(i){
    let highlight = this.state.selected === i ? true : false;
    return <Tower key={i} disks={this.state.disks[i]} onClick={()=>this.handleClick(i)} highlight={highlight}/>
  }

  render() {
    return (
      <div className="Game">
        {this.state.disks[0].length}
        {this.renderTower(0)}
        {this.state.disks[1].length}
        {this.renderTower(1)}
        {this.state.disks[2].length}
        {this.renderTower(2)}
      </div>
    );
  }
}

export default Game;
