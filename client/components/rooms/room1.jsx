import React, { Component } from 'react';
import Akiko from '../characters/akiko.jsx'

class Room1 extends Component {
  render() {
    return (
      <div className="room1 canvas">
        <Akiko />
      </div>
    );
  }
}

export default Room1;
