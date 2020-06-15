import React from 'react'
import Dropzone from 'react-dropzone'

function ReactDropZoneWidget(props) {
  const { isReading, onAcceptedFiles } = props

  const _onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onAcceptedFiles(acceptedFiles)
    }
  }

  return (
    <Dropzone onDrop={_onDrop} accept="image/*" disabled={isReading}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section className="no-print">
          <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
            <input {...getInputProps()} />
            {isReading ? (
              <div className="m-auto">
                <span>Handling files... &nbsp;</span>
                <span className="spinner-border spinner-border-sm text-info" role="status" aria-hidden="true" />
              </div>
            ) : (
                isDragActive ?
                  <p>Drop here...</p> :
                  <p>Drag and drop files here, or click to select files</p>
              )}
          </div>
        </section>
      )}
    </Dropzone>
  )
}

export default ReactDropZoneWidget
