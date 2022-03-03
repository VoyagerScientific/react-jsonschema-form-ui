import React, { useState } from "react";
import FontAwesome from "react-fontawesome";

class PhotoItem extends React.Component {
  render() {
    return (
      <div>
        <div onClick={this.props.onDeleteButtonClick}>
          <FontAwesome
            style={{
              color: "#e30000",
              backgroundColor: 'white',
              fontSize: "20px",
              position: "absolute",
              right: "5px",
              top: "5px",
              height: "19px",
              borderRadius: "2px"
            }}
            className={"d-print-none remove-photo-item-btn"}
            name="window-close"
          />
        </div>
        <img {...this.props.imageProps} />;
      </div>
    );
  }
}

export default PhotoItem
