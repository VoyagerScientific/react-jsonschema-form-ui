import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import _ from 'lodash'
import FileDisplay from './components/FileDisplay'
import { Spinner } from 'react-bootstrap'

function ReactDropZoneWidget(props) {
  const { isReading, onAcceptedFiles, onChange } = props
  const [saving, setSaving] = useState(false);
  const acceptedFiles = _.get(props, 'options.accepted');
  const originalValue = _.isArray(props.value) ? props.value : [];

  const _onDrop = async (acceptedFiles) => {
    try {
      setSaving(true);
      if (acceptedFiles.length > 0 && onAcceptedFiles) {
        await onAcceptedFiles([...originalValue, ...acceptedFiles]);
      }
      if (acceptedFiles.length > 0 && onChange) {
        await onChange([...originalValue, ...acceptedFiles]);
      }
    } catch (error) {
      alert(error);
    } finally {
      setSaving(false);
    }
  }

  const handleRemove = (item, index) => {
    const filteredFiles = _.reject(props.value, (file, currentIndex) => index === currentIndex);
    props.onChange && props.onChange(filteredFiles);
  };

  const areFilesVisible = _.get(props, 'options.withFileDisplay') && !_.isEmpty(props.value);
  return (
    <Dropzone onDrop={_onDrop} accept={(acceptedFiles || ["image/*"])} disabled={saving}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <>
          <section className="d-print-none">
            <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
              <input {...getInputProps()} name={props.id} />
              {saving ? (
                <div className="m-auto">
                  <Spinner size="sm" />
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
          { props.rawErrors && props.rawError.map((error) => {
            return (
              <div>{error}</div>
            )
          })}
          { areFilesVisible && <FileDisplay files={props.value} onRemove={handleRemove} />}
        </>
      )}
    </Dropzone>
  )
}

export default ReactDropZoneWidget
