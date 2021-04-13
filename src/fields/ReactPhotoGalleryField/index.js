import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Gallery from "react-grid-gallery";
import _ from "lodash";
import { ReactDropZoneWidget } from "../../index";
import PhotoItem from "./components/PhotoItem";

class ReactPhotoGalleryField extends React.Component {
  handleRemoveFile = (index) => {
    const { formData, onChange } = this.props;
    const attachments = formData.attachments;
    const newAttachments = _.reject(attachments || [], (item, i) => i === index);
    onChange && onChange({ attachments: newAttachments });
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
    const responseData = _.get(response, "data");
    const attachments = this.getAttachments();
    if (_.isArray(responseData)) {
      const newAttachments = [...attachments, ...responseData];
      onChange && onChange({ attachments: newAttachments });
    } else {
      attachments.push(responseData);
      onChange && onChange({ attachments });
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
    const attachments = _.get(this.props, "formData.attachments", []) || [];
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

  renderGallery() {
    const images = _.map(this.getAttachments(), ({ url }) => ({
      src: url,
      thumbnail: url,
      thumbnailWidth: 300,
      thumbnailHeight: 300,
    }));
    return <Gallery
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
    const { schema, uploadComponent } = this.props;
    const UploadComponent = uploadComponent || ReactDropZoneWidget;
    return (
      <Form.Group>
        <Form.Label>{schema.title}</Form.Label>
        <div className="react-gallery">
          {!this.isDisabled() && (
            <UploadComponent
              title={schema.title}
              accepted={["image/*"]}
              onAcceptedFiles={this.handleAcceptFiles}
              className={"d-print-none"}
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
