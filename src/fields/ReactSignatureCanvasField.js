import React, { Component } from 'react';
import SignatureCanvas from 'react-signature-canvas';

class ReactSignatureCanvasField extends Component{

  constructor(props){
    super(props);
    this.state = {
      ...props
    }
  }

  componentDidMount(){
    this.sigCanvas.fromDataURL(this.state.formData);
  }

  render(){
    return (
      <div className={this.state.classNames}>
        <SignatureCanvas
          ref={(ref) => { this.sigCanvas = ref }}
          penColor='black'
          canvasProps={{
            width: this.props.options && this.props.options.width || 400,
            height: this.props.options && this.props.options.height || 150,
            className: 'sigCanvas',
            style: {border: "#ddd 3px dashed", borderRadius: 4}
          }}
          backgroundColor="#fafafa"
          onEnd={(value) => this.state.onChange(this.sigCanvas.toDataURL(value))}
        />

        <div className="sigSalutation">
          <h6 style={{paddingTop: 10, marginTop: 15, borderTop: "#444 1px solid"}}>{this.state.schema.title}</h6>
        </div>
      </div>
    );
  }

}

export default ReactSignatureCanvasField;
