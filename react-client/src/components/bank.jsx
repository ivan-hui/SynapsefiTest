import React from 'react';
import TransferList from './TransferList.jsx';

class Bank extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      }
    }
  

  
    render() {
      return this.props.singleInfo && !this.props.accountsInfo ? (
        <div className="synapseTitle">
        <h4> Welcome {this.props.singleInfo.legal_names} </h4>
        <form>What would you like to do today?</form>
        <button onClick={this.props.createbank}>Create Bank Account</button>
        <button onClick={this.props.toggleTransfer}>Transfer Funds</button>
        </div>
      ) : (
        <TransferList amount={this.props.amount} handleAmountChange={this.props.handleAmountChange} transferFunds={this.props.transferFunds} toID={this.props.toID} assignBankIDother={this.props.assignBankIDother} otherAccountsInfo={this.props.otherAccountsInfo} fromID={this.props.fromID} allData={this.props.allData} accountsInfo={this.props.accountsInfo} findAccount={this.props.findAccount} assignBankID={this.props.assignBankID}/>
      )
    }
  }
  
  
  export default Bank;