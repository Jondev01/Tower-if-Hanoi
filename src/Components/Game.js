import React, { Component } from 'react';
import Tower from './Tower';

class Game extends Component {
  constructor(disks){
    super(disks);
    this.state = {
      disks : [
        [],
        [],
        []
      ]
    };
    for(let i=0; i<this.props.disks; i++){
      this.state.disks[0].push(i);
    }
  }

  handleClick(i){
    const disks = this.state.disk.slice();

  }

  render() {
    return (
      <div className="Game">
        <Tower height="3" onclick={()=>this.handleClick(0)}/>
        <Tower height="0"/>
        <Tower height="0"/>
      </div>
    );
  }
}

export default Game;
