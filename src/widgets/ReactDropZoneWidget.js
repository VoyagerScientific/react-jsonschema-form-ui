import React from 'react'
import Dropzone from 'react-dropzone'
import _ from 'lodash'
import FileDisplay from './components/FileDisplay'

function ReactDropZoneWidget(props) {
  const { isReading, onAcceptedFiles, onChange } = props
  const acceptedFiles = _.get(props, 'options.accepted')
  const _onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0 && onAcceptedFiles) {
      onAcceptedFiles(acceptedFiles)
    }
    if (acceptedFiles.length > 0 && onChange) {
      onChange(acceptedFiles)
    }
  }

  return (
    <Dropzone onDrop={_onDrop} accept={(acceptedFiles || ["image/*"])} disabled={isReading}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <>
        <section className="d-print-none">
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
        { _.get(props, 'options.withFileDisplay') && !_.isEmpty(props.value) && <FileDisplay files={props.value} /> }
        </>
      )}
    </Dropzone>
  )
}

export default ReactDropZoneWidget
