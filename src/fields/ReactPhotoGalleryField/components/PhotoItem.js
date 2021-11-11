import React, { useState } from "react";
import FontAwesome from "react-fontawesome";

class PhotoItem extends React.Component {
  render() {
    return (
      <div>
        <div onClick={this.props.onDeleteButtonClick}>
          <FontAwesome
            style={{
              color: "white",
              fontSize: "20px",
              position: "absolute",
              right: "5px",
              top: "5px",
            }}
            className={"d-print-none"}
            name="window-close"
          />
        </div>
        <img {...this.props.imageProps} />;
      </div>
    );
  }
}

export default PhotoItem
