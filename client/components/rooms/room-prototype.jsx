import React, { Component } from 'react';

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canvas = document.getElementById("canvas");
      stage = new createjs.stage(canvas);
      stage.enableDomEvents(true);
      tweens = [];
      stage.enableMouseOver(10);
      createJs.Touch.enable(stage);
    }

  }

  move() {


  }

  render() {
    return (
      <div className="canvas">


      </div>
    );
  }
}

export default Room;
