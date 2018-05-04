import React, { Component } from 'react';

class Character extends Component {
  constructor(props) {
    super(props)
    this.state = {
      happinessMeter: ''
    }

    //Add object state here with this.whatever = whatevers
//50 is going to be our base value, min 0 max 100

}

//Add Class Methods Here

beginConversation() {
    //start new scene: conversation
}

increaseHappiness(val) {

}

decreaseHappiness(val) {

}

getHappiness() {
    // returns happiness
}

isHappyEnough() {
    //when happiness increases above a certain level, change happiness options
}

isUnhappyEnough() {
    //measures unhappiness and changes options based on that
}



  render() {
    return (
      <div backgroundImg="../../../public/images/akiko.jpg">

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = {

}




export default Character;
