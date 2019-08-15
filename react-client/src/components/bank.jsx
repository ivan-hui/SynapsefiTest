import React from 'react';

class Bank extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      }
    }
  

  
    render() {
      return this.props.singleInfo ? (
        <div className="synapseTitle">
        <h4> Welcome Back {this.props.singleInfo.legal_names} </h4>
        <form>What type of Banking would you like to do today?</form>
      </div>
      ) : (
        <div>this should disappear
        </div>
      )
    }
  }
  
  
  export default Bank;