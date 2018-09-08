import React, { Component } from 'react';
import Rod from './Rod';
import Disk from './Disk';
import './Tower.css';

class Tower extends Component {

  render() {
    let output = [];
    const disks = this.props.disks.slice();
    let colors = ['black', 'red', 'blue', 'yellow', 'green'];
    for(let i in disks){
      let width = 25*(this.props.totalDisks-disks[i]*(this.props.totalDisks-1)/(this.props.totalDisks));
      let highlight = this.props.highlight && i == disks.length-1 ? true: false;
      const diskStyle = {
        position: 'absolute',
        width: width,
        bottom: `${highlight ? '100%': 10*i+'px'}`,
        transition: 'all 0.3s',
        left: '50%',
        transform: 'translate(-50%,100%)',
        border: `${highlight ? '2px solid yellow': 'none'}`
        //backgroundColor: `${highlight ? '#666': 'black'}`
      };
      output.push( <Disk key={i} style={diskStyle}/> )
    }
    const towerStyle = {
      display: 'inline-block',
      //margin: `${this.props.totalDisks<=6 ? '100px' : '150px'}`
      margin: '150px'
    };

    return (
      <div className="Tower" onClick={this.props.onClick} style={towerStyle}>
        <Rod>
          {output}
        </Rod>
      </div>
    );
  }
}

export default Tower;
