import React from 'react';

class Amount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       value: ''
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleAmountChange=this.handleAmountChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
      this.props.transferFunds(this.state.value)
  }

  handleAmountChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <form>
            How much would you like you Transfer?
        </form>
        <form>
            <label>
                Amount in $:
                <input type="text" value={this.state.value} onChange={this.handleAmountChange} name='amount' />
            </label>

            <button onClick={this.handleSubmit}>Submit</button>

        </form>
      </div>
    )
  }
}


export default Amount;