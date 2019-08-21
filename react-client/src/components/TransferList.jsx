import React from 'react';
import TransferItem from './TransferItem.jsx';
import TransferAccount from './TransferAccount.jsx';
import TransferOtherAccount from './TransferOtherAccount.jsx';
import Amount from './Amount.jsx';

const TransferList = (props) => (
  <div className="synapseTitle">
    {/* first page asking which account  */}
    {props.accountsInfo && !props.fromID ? <form>Which account would you like to Transfer From?</form>: <div></div>}
    {props.accountsInfo && !props.fromID ? props.accountsInfo.map(data => <TransferAccount data={data} assignBankID={props.assignBankID}/>):<div></div>}
    {/* second page asking which person */}
    {props.fromID   && !props.otherAccountsInfo ? <form>Who would you like to Transfer to?</form> : <div></div>}
    {props.fromID && !props.otherAccountsInfo? props.allData.map(data => <TransferItem data={data} assignID= {props.assignID} findAccount = {props.findAccount}/>): <div></div>}
    {/* third page asking which account */}
    {props.otherAccountsInfo && !props.toID ? <form>Which account would you like to Transfer to?</form> : <div></div>}
    {props.otherAccountsInfo && !props.toID ? props.otherAccountsInfo.map(data => <TransferOtherAccount data={data} assignBankIDother={props.assignBankIDother}/>):<div></div>}
    {/* fourthpage asking how much */}
    {props.toID && !props.amount? <Amount handleAmountChange={props.handleAmountChange} transferFunds={props.transferFunds}/> : <div></div>}
    {props.amount ? <form>Transaction Complete, refresh the page to start again</form> : <div></div>}

  </div>
)

export default TransferList;