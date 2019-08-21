import React from 'react';
import axios from 'axios';

class TransferItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }


  render() {
    return(
      <div className='bankMembers' onClick={()=>this.props.findAccount(this.props.data)}>
        <div className='people' >{ this.props.data.legal_names }</div>
      </div>
    )
  }
}

export default TransferItem;