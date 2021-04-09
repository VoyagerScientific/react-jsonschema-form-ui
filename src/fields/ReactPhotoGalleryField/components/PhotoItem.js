import React, { useState } from "react";
import FontAwesome from "react-fontawesome";

class PhotoItem extends React.Component {
  render() {
    return (
      <div
        style={{
          background: `url(${this.props.imageProps.src}) no-repeat center center`,
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            background: "linear-gradient(180deg, rgba(0,0,0,0.4), transparent)",
            width: "100%",
            height: "30%",
          }}
        >
          <div onClick={this.props.onDeleteButtonClick}>
            <FontAwesome
              style={{
                color: "white",
                fontSize: "20px",
                position: "absolute",
                right: "5px",
                top: "5px",
              }}
              name="window-close"
            />
          </div>
        </div>
        {/* <img {...this.props.imageProps} />; */}
      </div>
    );
  }
}

export default PhotoItem
