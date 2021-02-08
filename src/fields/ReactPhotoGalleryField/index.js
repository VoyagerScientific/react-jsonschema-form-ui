import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Gallery from "react-photo-gallery";

import { ReactDropZoneWidget } from "../../index";
import PhotoItem from "./components/PhotoItem";

const readFile = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const { result } = event.target;
    const img = new Image();
    img.src = result;
    img.onload = () => {
      callback({
        isLocal: true,
        src: result,
        file,
        width: img.width,
        height: img.height,
      });
    };
  });
  reader.readAsDataURL(file);
};

class ReactPhotoGalleryField extends React.Component {
  state = {
    isReading: false,
  };

  handleRemoveFile = (index) => {
    const { formData, onChange } = this.props;
    const newFormData = { ...formData };
    newFormData.attachments = newFormData.attachments.filter(
      (item, i) => i !== index
    );
    onChange && onChange(newFormData);
  };

  handleAcceptFiles = async (acceptedFiles) => {
    const fileUploadUrl = _.get(
      this.props,
      "uiSchema.ui:options.fileUploadUrl"
    );
    const authenticityToken = _.get(
      this.props,
      "uiSchema.ui:options.authenticity_token"
    );

    this.setState({ isSaving: true });
    var data = new FormData();
    for (const file of acceptedFiles) {
      data.append("attachments", file, file.name);
    }
    data.append("authenticity_token", authenticityToken);
    const response = await axios.post(fileUploadUrl, data, {
      headers: {
        Accept: "application/json",
        "X-CSRF-Token": authenticityToken,
      },
    });
    const responseData = _.get(response, "data");
    this.state.attachments.push(responseData);
    this.setState({ attachments: this.state.attachments });
    this.state.onChange(this.state.attachments);
  };

  isDisabled() {
    const { readonly, readOnly, disabled } = this.props;
    const isDisabled = readonly || readOnly || disabled;
    return isDisabled;
  }

  get attachments() {
    return _.get(this.props, "formdata.attachments", []) || [];
  }

  isColumnLayout() {
    const isColumnLayout = this.attachments.length > 1;
    return isColumnLayout;
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

  render() {
    const { schema, uploadComponent } = this.props;
    const { isSaving } = this.state;
    const UploadComponent = uploadComponent || ReactDropZoneWidget;
    return (
      <Form.Group>
        <Form.Label>{schema.title}</Form.Label>
        <div className="react-gallery">
          {!this.isDisabled() && (
            <UploadComponent
              title={schema.title}
              isReading={isSaving}
              accepted={["image/*"]}
              onAcceptedFiles={this.handleAcceptFiles}
              className={"d-print-none"}
            />
          )}
          <Gallery
            photos={this.attachments}
            renderImage={this.renderPhotos}
            columns={2}
            direction={this.isColumnLayout() ? "column" : "row"}
          />
        </div>
      </Form.Group>
    );
  }
}

export default ReactPhotoGalleryField;
