import React, { Component } from "react";
import ReactDOM from "react-dom";
import QRReader from "react-qr-reader";

class ReactQRReaderField extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      showScanner: false,
      value: null
    };
  }

  handleScan = data => {
    if (data) {
      console.log(data);
      this.props.onChange(data);
      this.setState({ showScanner: false, value: data });
    }
  }
  handleError = err => {
    console.error(err);
  }

  supportsWebRTCMedia = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return false;
    }else
      return true;
  }

  isiOS = () => {
    return [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod"
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

  _getQRReader(){
    return ReactDOM.createPortal(
      (
        <div style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)"
        }}>
          <QRReader
            delay={500}
            onError={this.handleError}
            onScan={this.handleScan}
            className={"QRReader_container"}
            style={{ width: "100%" }}
            facingMode={"environment"}
           />
          <button style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            borderRadius: 0,
            margin: "auto",
            zIndex: 10 }}
            onClick={() => this.setState({ showScanner: false })}
            className="btn btn-block btn-secondary">Close</button>
        </div>
      ),
      document.getElementsByTagName("body")[0]
    );
  }

  render(){
    return (
      <span>
      {this.state.showScanner ?
        this._getQRReader()
      :
        <span>
          {this.state.value &&
            <span className="mr-2">{this.state.value}</span>
          }
          { this.isiOS() && !this.supportsWebRTCMedia() ?
            <button className="btn btn-sm btn-outline-danger" onClick={(e)=> {e.preventDefault(); alert("This browser does not support the camera. On iPhone, use Safari.")}}>QR</button>
          :
            <button onClick={() => this.setState({ showScanner: true })} className="btn btn-sm btn-secondary">QR</button>
          }
          {this.state.value &&
            <button onClick={() => {
              const clearValue = confirm("Are you sure?");
              if(clearValue)
                this.setState({ value: null })
            }} className="btn btn-sm btn-secondary ml-1">&times;</button>
          }
        </span>
      }
      </span>
    );
  }
}

export default ReactQRReaderField;
