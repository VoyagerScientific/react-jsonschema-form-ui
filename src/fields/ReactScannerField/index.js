import React, { Component } from "react";
import ReactDOM from "react-dom";
import Scanner from "./scanner";
import { BrowserMultiFormatReader } from "@zxing/library/esm/browser/BrowserMultiFormatReader.js";

const styles = {
  closeButton: {
    position: "fixed",
    bottom: "0px",
    left: "0px",
  }
};

class ReactScannerField extends Component {

  constructor(props) {
    super(props);
    this.codeReader = new BrowserMultiFormatReader();
    this.state = {
      ...props,
      showScanner: false,
      value: null
    };
  }

  handleChange = (codeValue) => {
    console.log(codeValue);
    this.props.onChange(codeValue);
    this.setState({ showScanner: false, value: codeValue });
  }

  handleScannerClose = () => {
    this.codeReader.stopStreams();
    this.setState({ showScanner: false });
  }

  handleScannerOpen = () => {
    this.setState({ showScanner: true });
  }

  _getScanner() {
    return ReactDOM.createPortal(
      (
        <div style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)"
        }}>
          <Scanner
            codeReader={this.codeReader}
            codeType="datamatrix"
            onCode={this.handleChange} />
          <button style={styles.closeButton} onClick={this.handleScannerClose} className="btn btn-block btn-secondary">Close</button>
        </div>
      ),
      document.getElementsByTagName("body")[0]
    );
  }

  render() {
    return (
      <span>
        {this.state.showScanner ?
          this._getScanner()
          :
          <span>
            {this.state.value &&
              <span className="mr-2">{this.state.value}</span>
            }
            <button onClick={this.handleScannerOpen} className="btn btn-sm btn-secondary">Scan</button>
            {this.state.value &&
              <button onClick={() => {
                const clearValue = confirm("Are you sure?");
                if (clearValue)
                  this.setState({ value: null })
              }} className="btn btn-sm btn-secondary ml-1">&times;</button>
            }
          </span>
        }
      </span>
    );
  }
}

export default ReactScannerField;
