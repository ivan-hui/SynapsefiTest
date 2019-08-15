import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import Bank from './components/Bank.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      phoneNumber: '',
      userID: '',
      singleInfo:'',
      allData: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.get()
  }
  


  handleNameChange(event) {
    this.setState({username: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePhoneChange(event) {
    this.setState({phoneNumber: event.target.value});
  }

  //regular get request for Full List
  
  get() {
    const that = this;
    axios.get('/getallusers')
    .then((response) => {
      console.log('AXIOS DOONE')
      console.log(response);
      that.setState({ allData: response.data.users })
    })
    .catch((error) => {
      console.log('AXIOS ERROR')
      console.log(error);
    });
  }

  //post new user and update Full List

  handleSubmit(event) {
    event.preventDefault();
    let username = this.state.username;
    let email = this.state.email;
    let phoneNumber = this.state.phoneNumber;
    
    axios.post("/newuser", {
        name: username,
        email: email,
        phoneNumber: phoneNumber
      })
      .then(info => {
        let that = this;
        console.log(info);
        that.setState({ info: info.data.body });
      })
      .catch(err =>
        console.log('Error from Submit button', err)
      );
      
      get();
  }
  

  //assign the user his ID and fill out individual Information

  assignID (ID) { 
    this.setState({
      userID : ID._id ,
      singleInfo: ID
    })

  }

  render () {
    return (
      <div className="synapseTitle">
        <div className='title'>Bank of Ivan</div>
        <form>
          If you see your Username, skip this step and click on your name.
        </form>
        <form>
            <label>
                Full Name:
                <input type="text" value={this.state.nameValue} onChange={this.handleNameChange} name="name" />
            </label>
            <label>
                Email:
                <input type="text" value={this.state.emailValue} onChange={this.handleEmailChange} name="email" />
            </label>
            <label>
                Phone Number:
                <input type="text" value={this.state.phoneValue} onChange={this.handlePhoneChange} name="phoneNumber" />
            </label>
            <button onClick={this.handleSubmit}>Submit</button>

        </form>
        <List allData={this.state.allData} userID={this.state.userID} assignID={this.assignID.bind(this)}/>
        <Bank userID={this.state.singleInfo}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));