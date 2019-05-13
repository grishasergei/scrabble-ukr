import React, {Component} from 'react';
import Confirm from '../../components/UI/Confirm/Confirm';
import Auxuliary from '../../hoc/Auxiliary/Auxiliary';

class ButtonWithConfirm extends Component {

  state = {
    showConfirmationDialog: false
  }

  noClickHandler = () => {
    this.setState({
      showConfirmationDialog: false
    });
  }

  yesClickHandler = () => {
    this.props.action();
    this.setState({
      showConfirmationDialog: false
    });
  }

  buttonClickHandler = () => {
    this.setState({
      showConfirmationDialog: true
    });
  }

  render () {
    let confirmationDialog = null;
    if (this.state.showConfirmationDialog === true) {
      confirmationDialog = <Confirm 
        question={this.props.question}
        yesClickHandler={this.yesClickHandler}
        noClickHandler={this.noClickHandler}
      />
    }
    return (
      <Auxuliary>
        {confirmationDialog}
        <button onClick={this.buttonClickHandler}>{this.props.caption}</button>
      </Auxuliary>
    );
  }
}

export default ButtonWithConfirm;