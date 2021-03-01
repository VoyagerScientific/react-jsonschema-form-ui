import React from "react";
import { Col, Row } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

class FileDisplay extends React.Component {
  handleRemove = (file, index) => {
    const { onRemove } = this.props;
    onRemove && onRemove(file, index);
  }

  render() {
    return <div className="file-display container">
      {(this.props.files || []).map((file, index) => (
        <Row key={index} className="file justify-content-between">
          <Col>{file.name}</Col>
          <Col xs="auto">
            <div
              onClick={() => this.handleRemove(file, index)}
            >
              <FontAwesome
                name="trash-alt" />
            </div>
          </Col>
        </Row>
      ))}
    </div>
  }
}

export default FileDisplay;