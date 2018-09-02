import React, { Component } from 'react';
import Rod from './Rod';
import Disk from './Disk';

class Tower extends Component {

  render() {
    let output = [];
    const disks = this.props.disks.slice();
    for(let i in disks){
      let width = 50-10*disks[i];
      let highlight = this.props.highlight && i===disks[i].length-1 ? true: false;
      const diskStyle = {
        position: 'absolute',
        width: width,
        bottom: 5*i,
        left: '50%',
        transform: 'translate(-50%,100%)'
      };
      output.push( <Disk key={i} style={diskStyle} highlight={highlight}/> )
    }
    const towerStyle = {
      display: 'inline-block',
      margin: '50px'
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
