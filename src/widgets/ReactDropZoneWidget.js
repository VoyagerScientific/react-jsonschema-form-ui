import React, { useState } from "react";
import Dropzone from "react-dropzone";
import _ from "lodash";
import FileDisplay from "./components/FileDisplay";
import { Spinner } from "react-bootstrap";
import Resizer from "react-image-file-resizer";

function ReactDropZoneWidget(props) {
  const { isReading, onAcceptedFiles, onChange, imageSettings } = props;
  const [saving, setSaving] = useState(false);
  const acceptedFiles = _.get(props, "options.accepted");
  const originalValue = _.isArray(props.value) ? props.value : [];
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        _.get(imageSettings, "maxWidth") || 1000,
        _.get(imageSettings, "maxHeight") || 1000,
        "PNG",
        _.get(imageSettings, "quality") || 90,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
  });

  const _onDrop = async (acceptedFiles) => {

    const processedFiles = _.map(acceptedFiles, async (file) => {
      if (["image/jpeg", "image/png"].includes(file.type))
        file = await resizeFile(file);

      return file
    })

    setSaving(true);
    Promise.all(processedFiles).then(async processedFiles => {
      try {
        if (processedFiles.length > 0 && onAcceptedFiles) {
          await onAcceptedFiles([...originalValue, ...processedFiles], props);
        }else if (processedFiles.length > 0 && onChange) {
          await onChange([...originalValue, ...processedFiles]);
        }
      } catch (error) {
        alert(error);
      } finally {
        setSaving(false);
      }
    });

  };

  const handleRemove = (item, index) => {
    const filteredFiles = _.reject(
      props.value,
      (file, currentIndex) => index === currentIndex
    );
    props.onChange && props.onChange(filteredFiles);
  };

  const areFilesVisible =
    _.get(props, "options.withFileDisplay") && !_.isEmpty(props.value);

  return (
    <Dropzone
      onDrop={_onDrop}
      accept={acceptedFiles || ["image/*"]}
      disabled={saving}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <>
          <section className="d-print-none">
            <div
              className={`dropzone ${isDragActive ? "active" : ""}`}
              {...getRootProps()}
            >
              <input {...getInputProps()} name={props.id} />
              {saving ? (
                <div className="m-auto">
                  <Spinner size="sm" />
                  <span>Handling files... &nbsp;</span>
                  <span
                    className="spinner-border spinner-border-sm text-info"
                    role="status"
                    aria-hidden="true"
                  />
                </div>
              ) : isDragActive ? (
                <p>Drop here...</p>
              ) : (
                <p>Drag and drop files here, or click to select files</p>
              )}
            </div>
          </section>
          {props.rawErrors &&
            props.rawErrors.map((error, i) => {
              return <div key={i}>{error}</div>;
            })}
          {areFilesVisible && (
            <FileDisplay files={props.value} onRemove={handleRemove} />
          )}
        </>
      )}
    </Dropzone>
  );
}

export default ReactDropZoneWidget;
