import React from 'react';

class FileDisplay extends React.Component {
  render() {
    return <div className="files">
      { (this.props.files || []).map((file) => (
        <div className="file">{file.name}</div>
      ))}
    </div>
  }
}

export default FileDisplay;