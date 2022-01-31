import React, { Component } from "react";
import PropTypes from "prop-types";
import videoCanvas from "video-canvas";

const wrapperStyles = {
  overflowY: "hidden",
  position: "static",
  width: "100%",
};

const styles = {
  fullScreen: {
    width: "100vw",
    height: "100vh",
    background: "aqua",
    position: "fixed",
    top: "0px",
    left: "0px",
  }
};

class CodeReader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      showPlaceholder: true
    };
  }

  handleSuccess = (result) => {
    this.props.codeReader.stopStreams();
    this.props.onCode(result.text);
  };

  componentWillUnmount() {
    this.props.codeReader.stopStreams();
  }

  handleError = (err) => {
    console.log(err);
  };

  async componentDidMount() {
    const videoInputDevices = await this.props.codeReader.listVideoInputDevices();
    this.setState({ devices: videoInputDevices });

    // const firstDeviceId = videoInputDevices[0].deviceId;
    this.props.codeReader
      .decodeOnceFromVideoDevice(undefined, "video")
      .then(this.handleSuccess)
      .catch(this.handleError);

    const video = document.querySelector("video");
    videoCanvas(video, {
      canvas: document.querySelector("#video-canvas"),
      drawCall: function (ctx, video) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const aspectWidth = (ctx.canvas.width / ctx.canvas.offsetWidth);
        const aspectHeight = (ctx.canvas.height / ctx.canvas.offsetHeight);
        ctx.drawImage(video,
          ((ctx.canvas.offsetWidth - video.videoWidth) / 2) * aspectWidth,
          ((ctx.canvas.offsetHeight - video.videoHeight) / 2) * aspectHeight,
          aspectWidth * video.videoWidth,
          aspectHeight * video.videoHeight,
        );
        ctx.beginPath();
        const rectangleWidth = aspectWidth * (video.videoWidth - 250);
        const rectangleHeight = aspectHeight * (video.videoHeight - 100);
        ctx.lineWidth = 10;
        ctx.strokeStyle  = "rgba(100,100,100,0.5)";
        ctx.rect(
          ((ctx.canvas.offsetWidth - ctx.canvas.width + 250) / 2) * aspectWidth,
          ((ctx.canvas.offsetHeight - ctx.canvas.height + 100) / 2) * aspectHeight,
          rectangleWidth,
          rectangleHeight);
        ctx.stroke();
      }
    })
  }

  render() {
    return (
      <div className={this.props.className} style={{ ...wrapperStyles, ...this.props.style }}>
        {this.state.showPlaceholder ?
          <span><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></span>
          : null}
        <video
          id="video"
          style={{ display: "none" }}
        ></video>
        <canvas
          id="video-canvas"
          style={styles.fullScreen}
        ></canvas>
      </div>
    );
  }
}

CodeReader.propTypes = {
  onInit: PropTypes.func,
  shouldDecode: PropTypes.bool,
  onCode: PropTypes.func,
  style: PropTypes.object,
  videoStyle: PropTypes.object,
  rearCamera: PropTypes.bool,
  className: PropTypes.string,
};

CodeReader.defaultProps = {
  onInit: () => { },
  shouldDecode: true,
  onCode: () => { },
  style: {},
  videoStyle: {},
  rearCamera: true,
  className: undefined,
};

export default CodeReader;
