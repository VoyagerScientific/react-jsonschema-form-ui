import React, { Component } from "react";
import PropTypes from 'prop-types';
import VideoStream from './video_stream';
// import Worker from 'worker-loader!./qr_decode.worker.js';
import ScannerWorker from 'worker-loader!./scanner_decode.worker.js';
import { BrowserQRCodeReader } from '@zxing/library';
const codeReader = new BrowserQRCodeReader();

const wrapperStyles = {
  overflowY: 'hidden',
  position: 'static',
  width: '100%',
};

class QRReader extends Component {
  webWorker = null;

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      showPlaceholder: true
    };
  }

  componentWillMount() {
    if(this.props.codeType === 'datamatrix'){
      this.webWorker = new ScannerWorker();
    }else{
      this.webWorker = new Worker();
    }

    this.webWorker.addEventListener('message', this.onFrameDecoded);
  }

  componentWillUnmount() {
    if (this.webWorker !== null) {
      this.webWorker.terminate();
      this.webWorker = null;
    }
  }

  onVideoStreamInit = (state, drawFrame) => {
    if (this.props.onInit) {
      this.props.onInit(state);
    }
    this.drawVideoFrame = drawFrame;

    if (this.props.shouldDecode) {
      this.drawVideoFrame();
      this.setState({showPlaceholder: false});
    }
  }

  onFrame = async (frameData) => {
    const {data, width, height} = frameData
    const img_data = new ImageData(data, width, height);

    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);

    var img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    console.log(img)
    try{
      const result = await codeReader.decodeFromImage(img);
    }catch(e){
      console.log(e);
      return
    }

    // this.webWorker.postMessage(frameData);
  }
  drawVideoFrame = () => { }

  onFrameDecoded = (event) => {
    const code = event.data;
    if (code) {
      const { data } = code;
      if (this.props.onCode && data.length > 0) {
        this.props.onCode(code);
      }
    }

    if (this.props.shouldDecode) {
      this.drawVideoFrame();
    }
  };

  render() {
    return (
      <div className={this.props.className} style={{ ...wrapperStyles, ...this.props.style }}>
        {this.state.showPlaceholder ?
          <span><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></span>
        : null}
        <VideoStream
          onFrame={this.onFrame}
          onInit={this.onVideoStreamInit}
          rearCamera={this.props.rearCamera}
          style={this.props.videoStyle}
        />
      </div>
    );
  }
}

QRReader.propTypes = {
  onInit: PropTypes.func,
  shouldDecode: PropTypes.bool,
  onCode: PropTypes.func,
  style: PropTypes.object,
  videoStyle: PropTypes.object,
  rearCamera: PropTypes.bool,
  className: PropTypes.string,
};

QRReader.defaultProps = {
  onInit: () => { },
  shouldDecode: true,
  onCode: () => { },
  style: {},
  videoStyle: {},
  rearCamera: true,
  className: undefined,
};

export default QRReader;
