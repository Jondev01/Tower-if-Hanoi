import React, { Component } from 'react';

class Rod extends Component {
  render() {
    let width, height;
    width = this.props.width ? this.props.width : '7px';
    height = this.props.height ? this.props.height: '100px'
    const divStyle ={
      position: 'relative',
      display: 'inline-block',
      width: width,
      height: height,
      backgroundColor: '#db460e',
      margin: 0,
      padding: '0',
    };
    return (
      <div className="Rod" style={divStyle}>
        {this.props.children}
      </div>
    );
  }
}

export default Rod;
