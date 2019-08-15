import React from 'react';
import axios from 'axios';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

//   assignUser(user) {
//     axios.post('/getuser', user)
//       .then((response) => {
//         console.log(response, 'POST SUCCESS')
//       })
//       .catch((error) => {
//         console.log(error, user)
//       })

//   }

  render() {
    return(
      <div className='bankMembers'>
        <div className='people' onClick={() => {this.props.assignID( this.props.data )}}>{ this.props.data.legal_names }</div>
      </div>
    )
  }
}


export default ListItem;