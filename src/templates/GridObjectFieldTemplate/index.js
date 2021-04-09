import React from "react";
import BasicObjectFieldTemplate from "./basic-object-field-template";
import RootObjectFieldTemplate from "./root-object-field-template";
class GridObjectFieldTemplate extends React.Component {
  render() {
    const { idSchema } = this.props;

    if (idSchema.$id === "root") {
      return <RootObjectFieldTemplate {...this.props} />;
    }
  
    return (<BasicObjectFieldTemplate {...this.props} />);  
  }
}

export default GridObjectFieldTemplate;