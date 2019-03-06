import React, { Component } from 'react';
import Rod from './Rod';
import Disk from './Disk';
import './Tower.css';

class Tower extends Component {

  render() {
    let output = [];
    const disks = this.props.disks.slice();
    let colors = ['#ff0040', '#bf00ff', '#4000ff', '#0040ff',
    '#00ffff', '#00ff40', '	#40ff00', '#bfff00', '#ff8000', '#ff4000'];
    //let scale = Math.max(window.innerWidth, window.screen.width) <1000 ? 8 : 25;
    let scale = 25;
    if(Math.max(window.innerWidth, window.screen.width) <1000 && this.props.totalDisks>5)
      scale = 8;
    for(let i in disks){
      let width = scale*(this.props.totalDisks-disks[i]*(this.props.totalDisks-1)/(this.props.totalDisks));
      let highlight = this.props.highlight && i == disks.length-1 ? true: false;
      const diskStyle = {
        position: 'absolute',
        width: width,
        bottom: `${highlight ? '100%': 10*i+'px'}`,
        transition: 'all 0.3s',
        left: '50%',
        transform: 'translate(-50%,100%)',
        border: `${highlight ? '2px solid yellow': 'none'}`,
        //backgroundColor: `${highlight ? '#666': 'black'}`
        //backgroundColor: colors[i]
      };
      output.push( <Disk key={i} style={diskStyle}/> )
    }
    const towerStyle = {
      display: 'inline-block',
      //margin: `${this.props.totalDisks<=6 ? '100px' : '150px'}`
      margin: '10%',
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
