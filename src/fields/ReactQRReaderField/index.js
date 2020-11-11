import React, { Component } from 'react';
import QRReader from "./qr_reader";

class ReactQRReaderField extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render(){
    return (
      <QRReader onCode={code => console.log(code)} />
    );
  }
}

export default ReactQRReaderField;
