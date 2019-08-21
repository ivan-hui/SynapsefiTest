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
      allData: '',
      bankID:'',
      fromID: '',
      toID:'',
      amount:'',
      accountsInfo:'',
      otherAccountsInfo:''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
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

  handleAmountChange(event) {
    this.setState({amount: event.target.value});
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
        this.get();
      })
      .catch(err =>
        console.log('Error from Submit button', err)
      );
      
  }
  
  //assign the user his ID and fill out individual Information
  assignID (ID) { 
    this.setState({
      userID : ID._id ,
      singleInfo: ID
    })

  }

    
  //find ID bank of person clicked
  assignBankID(ID) {
    this.setState({
      fromID: ID
    })
  }

  //find ID of bank you want to send to
  assignBankIDother(ID) {
    this.setState({
      toID: ID
    })
  }

  //create bank account
  createbank() {
    console.log('TEST BANK')
    axios.post('/createbank',this.state.singleInfo)
      .then(res => {
        console.log('Success from Create Bank', res)

      })
      .catch(err => {
        console.log('Error From Create Bank Account', err)
      })
  }


  //find bank accounts 
  toggleTransfer() {
    axios.post('/getBankAccounts', this.state.singleInfo)
      .then(res => {
        console.log('success from find bank', res)
        this.setState({
          accountsInfo: res.data.nodes
        })
      })
      .catch(err => {
        console.log('error from find bank accounts', err)
      })
  }

  //find bank accounts for other party 
  findAccount(ID) {
    axios.post('/getBankAccounts', ID)
      .then(res => {
        console.log('success from find other bank', res)
        this.setState({
          otherAccountsInfo: res.data.nodes
        })
      })
      .catch(err => {
        console.log('error from find other bank accounts', err)
      })
  }

  //transfer funds 
  transferFunds(amountTrans) {

    this.setState({
      amount: amountTrans
    })

    console.log(this.state.amount, 'Transfer Funds')

    let body = {
      userID: this.state.singleInfo._id,
      fromID: this.state.fromID,
      toID: this.state.toID,
      amount: amountTrans
    }
    axios.post('/transferFunds', body)
      .then(res => {
        console.log('success from axios transfer funds', res)
      })
      .catch(err => {
        console.log('error from axios transfer funds', err)
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
        <Bank amount={this.state.amount} handleAmountChange={this.handleAmountChange} transferFunds={this.transferFunds.bind(this)} toID={this.state.toID} otherAccountsInfo={this.state.otherAccountsInfo} assignBankIDother={this.assignBankIDother.bind(this)}fromID={this.state.fromID} singleInfo={this.state.singleInfo} createbank={this.createbank.bind(this)} allData={this.state.allData} accountsInfo={this.state.accountsInfo} assignBankID={this.assignBankID.bind(this)} findAccount={this.findAccount.bind(this)} toggleTransfer={this.toggleTransfer.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));