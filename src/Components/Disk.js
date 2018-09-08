import React, { Component } from 'react';

class Disk extends Component {
  render() {
    let width;
    if(width)
      width = this.props.width;
    else width = '30px';
    let divStyle ={
      display: 'inline-block',
      width: width,
      height: '7px',
      backgroundColor: 'black',
      padding: '0',
      borderRadius: '10px',
      margin: 0
    };
    const style = {...divStyle,...this.props.style};
    return (
      <div className="Disk" style={style}>
      </div>
    );
  }
}

export default Disk;
