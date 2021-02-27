import React, { Component } from 'react';
import _ from 'lodash';
import SignatureCanvas from 'react-signature-canvas';

class ReactSignatureCanvasField extends Component {
  static getDerivedStateFromProps(props, state) {
    const options = _.merge(props.uiSchema['ui:options'], props.options);
    return {
      ...props,
      options: { width: options.width || 400, height: options.height || 150 },
      value: props.formData || '',
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.state.readonly && this.sigCanvas)
      this.sigCanvas.fromDataURL(this.state.formData);
  }

  _clear(e) {
    e.preventDefault();

    const confirmed = confirm('Clear the signature?');
    if (confirmed) {
      this.sigCanvas.clear();
      this.setState({ value: '' });
      this.state.onChange();
    } else {
      return false;
    }
  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
          width: this.state.options.width + 41,
          minHeight: this.state.options.height + 40,
        }}
      >
        {!this.state.readonly ? (
          <div>
            <SignatureCanvas
              ref={(ref) => {
                this.sigCanvas = ref;
              }}
              penColor="black"
              canvasProps={{
                width: this.state.options.width,
                height: this.state.options.height,
                className: 'sigCanvas',
                style: { border: '#ddd 3px dashed', borderRadius: 4 },
              }}
              backgroundColor="#fafafa"
              onEnd={(value) => {
                this.state.onChange(this.sigCanvas.toDataURL(value));
                this.setState({ value: this.sigCanvas.toDataURL(value) });
              }}
            />
            <input
              type="text"
              style={{ border: 0, height: 1, width: 1 }}
              value={this.state.value}
              onChange={(event) => {
                return this.state.value;
              }}
              readOnly
              required={this.state.required}
            />
            {this.sigCanvas && !this.sigCanvas.isEmpty() ? (
              <button
                className="btn btn-secondary d-print-none"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: this.state.options.height + 6,
                  fontSize: 16,
                  fontWeight: '700',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderWidth: 3,
                }}
                onClick={this._clear.bind(this)}
              >
                &times;
              </button>
            ) : null}
          </div>
        ) : this.state.formData ? (
          <img
            style={{ minHeight: this.state.options.height }}
            src={this.state.formData}
          />
        ) : (
          <div
            style={{
              minHeight: this.state.options.height,
              fontWeight: '700',
              lineHeight: this.state.options.height + 'px',
              color: '#666',
              backgroundColor: '#fafafa',
              textAlign: 'center',
            }}
          >
            No Signature
          </div>
        )}
        <div className="sigSalutation">
          <h6
            style={{
              paddingTop: 10,
              marginTop: 15,
              borderTop: '#444 1px solid',
            }}
          >
            {this.state.schema.title}
          </h6>
        </div>
      </div>
    );
  }
}

ReactSignatureCanvasField.defaultProps = {
  options: {},
};

export default ReactSignatureCanvasField;
