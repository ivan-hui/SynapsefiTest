import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div className="synapseTitle">
    {props.allData && !props.userID ? (
      <div>
      <h4> Current Members </h4>
      <form>Please find your name on the List Below</form>
      <div>There are { props.allData.length } members</div>
      </div>
    ) :<div></div>}
    {props.allData && !props.userID ? props.allData.map(data => <ListItem data={data} assignID= {props.assignID} />): <div></div>}
  </div>
)

export default List;