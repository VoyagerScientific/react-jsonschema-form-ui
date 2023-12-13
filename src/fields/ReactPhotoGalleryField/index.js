import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Gallery } from "react-grid-gallery";
import _ from "lodash";
import { ReactDropZoneWidget } from "../../index";
import PhotoItem from "./components/PhotoItem";

class ReactPhotoGalleryField extends React.Component {
  handleRemoveFile = (index) => {
    const { formData, onChange } = this.props;
    const attachments = formData;
    const newAttachments = _.reject(attachments || [], (item, i) => i === index);
    onChange && onChange(newAttachments);
  };

  handleAcceptFiles = async (acceptedFiles) => {
    const { onChange } = this.props;
    const {
      fileUploadUrl,
      authenticity_token: authenticityToken
    } = _.get(this.props, "options") || {};
    const formData = this.createFormData(acceptedFiles, authenticityToken);
    const response = await axios.post(fileUploadUrl, formData, {
      headers: {
        Accept: "application/json",
        "X-CSRF-Token": authenticityToken,
      },
    });
    let responseData = _.get(response, "data");
    const attachments = this.getAttachments();

    if (!_.isArray(responseData))
      responseData = [responseData];

    const promises = responseData.map(async (attachment) => {
      const dimensions = await this.getImageDimensions(attachment.url);
      return {...attachment, ...dimensions};
    });
    const allPromises = Promise.all(promises)
    const attachmentsWithMetaData = await allPromises;

    if (_.isArray(responseData)) {
      const newAttachments = [...attachments, ...attachmentsWithMetaData];
      onChange && onChange(newAttachments);
    } else {
      attachments.push(attachmentsWithMetaData);
      onChange && onChange(attachments);
    }
  };

  isDisabled() {
    const { readonly, readOnly, disabled } = this.props;
    const isDisabled = readonly || readOnly || disabled;
    return isDisabled;
  }

  createFormData(acceptedFiles, authenticityToken) {
    var data = new FormData();
    for (const file of acceptedFiles) {
      data.append("attachments", file, file.name);
    }
    data.append("authenticity_token", authenticityToken);
    return data;
  }

  getAttachments() {
    const attachments = _.get(this.props, "formData", []) || [];
    if (_.isArray(attachments)) {
      return attachments;
    } else {
      return [];
    }
  }

  renderPhotos = (item) => {
    return (
      <PhotoItem
        {...item}
        key={item.index}
        isColumn={this.isColumnLayout()}
        onRemove={this.handleRemoveFile}
      />
    );
  };

  getImageDimensions = async (url) => {
    const imageDimensions = url => 
    new Promise((resolve, reject) => {
        const img = new Image()

        // the following handler will fire after the successful loading of the image
        img.onload = () => {
            const { naturalWidth: width, naturalHeight: height } = img
            resolve({ width, height })
        }

        // and this handler will fire if there was an error with the image (like if it's not really an image or a corrupted one)
        img.onerror = () => {
            reject('There was some problem with the image.')
        }
    
        img.src = url
    });

    return await imageDimensions(url);
  }



  renderGallery() {
    const { rowHeight } = this.props;
    const images = _.map(this.getAttachments(), ({ url, width, height }) => {

      return {
        src: url,
        width: width || 500,
        height: height || 500
      }
    });
    return <Gallery
      rowHeight={rowHeight || 400}
      onSelectImage={this.handleRemoveFile}
      enableLightbox={false}
      thumbnailImageComponent={(imageProps) =>
        <PhotoItem
          onDeleteButtonClick={() => this.handleRemoveFile(imageProps.index)}
          {...imageProps} />}
          enableImageSelection={false}
          images={images}
        />
  }

  render() {
    const { schema, uploadComponent, onAcceptedFiles } = this.props;
    const UploadComponent = uploadComponent || ReactDropZoneWidget;
    return (
      <Form.Group>
        <label className="control-label">{schema.title}</label>
        <div className="react-gallery">
          {!this.isDisabled() && (
            <UploadComponent
              title={schema.title}
              accepted={["image/*"]}
              onAcceptedFiles={(files) => onAcceptedFiles([...this.getAttachments(), ...files], this.props) || this.handleAcceptFiles}
              className={"d-print-none"}
              adjustImages={null}
              isPhotoGallery={true}
            />
          )}
          <div>
            {this.renderGallery()}
          </div>
        </div>
      </Form.Group>
    );
  }
}

export default ReactPhotoGalleryField;
