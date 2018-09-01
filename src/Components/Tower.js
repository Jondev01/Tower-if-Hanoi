import React, { Component } from 'react';
import Rod from './Rod';
import Disk from './Disk';

class Tower extends Component {
  render() {
    let disks = [];
    let height = this.props.height ? this.props.height : 3;
    for(let i=0; i<height; i++){
      let width = 5+10*(height-i);
      const diskStyle = {
        position: 'absolute',
        width: width,
        bottom: 5*i,
        left: '50%',
        color: 'red',
        transform: 'translate(-50%,100%)'
      };
      disks.push( <Disk key={i} style={diskStyle}/> )
    }
    const towerStyle = {
      display: 'inline-block',
      margin: '50px'
    };

    return (
      <div className="Tower" onClick={()=>alert("Hi")}style={towerStyle}>
        <Rod>
          {disks}
        </Rod>
      </div>
    );
  }
}

export default Tower;
