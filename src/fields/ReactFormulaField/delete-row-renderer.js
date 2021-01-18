import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from "react-fontawesome";

class DeleteRowRenderer extends React.Component {
  
  handleClick = (event) => {
    console.log(this.props)
    if(this.props.confirmRemove && !window.confirm("Are you sure?"))
      return false;

    const { onClick } = this.props;
    onClick && onClick(event, this.props.rowIndex);
  }
  
  render() {
    return (
      <Button
        size="sm"
        onClick={this.handleClick}
        variant="link"><FontAwesome 
        name={"times-circle"} color="#000000" /></Button>
    )
  }
}

export default DeleteRowRenderer;