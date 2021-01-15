import React from 'react';
import { Button } from 'react-bootstrap';

class DeleteRowRenderer extends React.Component {
  
  handleClick = (event) => {
    const { onClick } = this.props;
    onClick && onClick(event, this.props.rowIndex);
  }
  
  render() {
    return (
      <Button
        size="sm"
        onClick={this.handleClick}
        variant="link">Remove</Button>
    )
  }
}

export default DeleteRowRenderer;