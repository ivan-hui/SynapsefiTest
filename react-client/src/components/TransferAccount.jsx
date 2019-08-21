import React from 'react';

class TransferAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }


  render() {
    return (
      <div className='bankMembers' onClick={()=> this.props.assignBankID(this.props.data._id)}>
        <div className='people'>{this.props.data.info.nickname}</div>
        <div> Balance: {this.props.data.info.balance.amount}</div>
      </div>
    )
  }
}


export default TransferAccount;