import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col, Spinner } from 'react-bootstrap';  
import 'intelligent-tree-select/lib/styles.css';
import FontAwesome from 'react-fontawesome';

class ReactTreeSelectFieldOption extends Component {
  handleClick = (event) => {
    const props = this.props;
    if (!this.props.option.isEnd) {
      event.stopPropagation();
      return;
    }
    this.props.selectValue(this.props.option);
    console.log(event, props);
  }

  handleToggle = () => {
    this.props.focusOption(this.props.option);
    this.props.toggleOption(this.props.option);
    this.props.select.current.forceUpdate();
  }

  isOptionSelected = () => {
    return _.some(this.props.valueArray, (selectedOption) => selectedOption.value === this.props.option.value);
  }

  render() {
    const fetching = this.props.select.current.state.isLoadingExternally;
    const expanded = this.props.option.expanded;
    const isSelected = this.isOptionSelected();
    return (
      <li style={{ listStyleType: 'none', ...this.props.optionStyle }}>
      <Row
        style={{ margin: '5px' }}
        className="align-items-center">
        <Col
          xs="auto"
          md="auto"
          onClick={this.handleToggle}
          style={{ padding: '0 5px', margin: 0 }}
          className={'btn'}
          >
            {(fetching && `${this.props.focusedOptionIndex}` === `${this.props.optionIndex}`) && (<Spinner size="sm" animation="border" />)}
            {!(fetching && `${this.props.focusedOptionIndex}` === `${this.props.optionIndex}`) && !this.props.option.isEnd && (
            <div>
              <FontAwesome 
                name={expanded ? 'minus-circle' : 'plus-circle'} />
            </div>
              )}
            
        </Col>
        <Col
          xs="auto"
          style={{ padding: 0, margin: 0, fontWeight: isSelected ? 'bold': 'normal' }}
          className={'btn'}
          onClick={this.handleClick}
        >{this.props.option.label}</Col>
      </Row>
      </li>
  );
  }
};

export default ReactTreeSelectFieldOption;