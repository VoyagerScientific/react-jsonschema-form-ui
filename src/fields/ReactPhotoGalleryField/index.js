import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Gallery from "react-photo-gallery";

import { ReactDropZoneWidget } from "../../index";
import PhotoItem from "./components/PhotoItem";

class ReactPhotoGalleryField extends React.Component {
  handleRemoveFile = (index) => {
    const { formData, onChange } = this.props;
    const newFormData = _.reject(formData || [], (item, i) => i === index);
    onChange && onChange(newFormData);
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
      onChange && onChange(newAttachments);
    } else {
      attachments.push(responseData);
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

  isColumnLayout() {
    return !_.isEmpty(this.getAttachments);
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
    const renderedAttachments = _.map(this.getAttachments(), ({ url }) => ({ src: url, width: 1, height: 1 }));
    return <Gallery
      photos={renderedAttachments}
      renderImage={this.renderPhotos}
      columns={2}
      direction={this.isColumnLayout() ? "column" : "row"}
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
          {this.renderGallery()}
        </div>
      </Form.Group>
    );
  }
}

export default ReactPhotoGalleryField;
