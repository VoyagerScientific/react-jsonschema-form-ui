import React from 'react';

export default (Component) => {
  return class extends Component {
    render() {
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: this.props.uiSchema.$header }}>
          </div>
          {super.render()}
        </div>
      )
    }
  }
};
