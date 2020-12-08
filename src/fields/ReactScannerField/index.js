import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QRReader from "./qr_reader";

class ReactScannerField extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      showScanner: false,
      value: null
    };
  }

  _getQRReader(){
    return ReactDOM.createPortal(
      (
        <div style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}>
          <QRReader codeType="datamatrix" onCode={code => {console.log(code); this.props.onChange(code.data), this.setState({showScanner: false, value: code.data})}} />
          <button style={{maxWidth: 640, margin: 'auto'}} onClick={() => this.setState({showScanner: false})} className="btn btn-block btn-secondary">Close</button>
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
          <button onClick={() => this.setState({showScanner: true})} className="btn btn-sm btn-secondary">Scan</button>
          {this.state.value &&
            <button onClick={() => {
              const clearValue = confirm("Are you sure?");
              if(clearValue)
                this.setState({value: null})
            }} className="btn btn-sm btn-secondary ml-1">&times;</button>
          }
        </span>
      }
      </span>
    );
  }
}

export default ReactScannerField;
