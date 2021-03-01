import React from "react";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

function ArrayFieldTitle({ TitleField, idSchema, title, required }) {
  if (!title) {
    return null;
  }
  const id = `${idSchema.$id}__title`;
  return <TitleField id={id} title={title} required={required} />;
}

function ArrayFieldDescription({ DescriptionField, idSchema, description }) {
  if (!description) {
    return null;
  }
  const id = `${idSchema.$id}__description`;
  return <DescriptionField id={id} description={description} />;
}

function DefaultArrayItem(props) {
  const btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
  };
  return (
    <div key={props.key} className={props.className}>
      {props.children}

      {props.hasToolbar && (
        <div className="array-item-toolbox">
          <div
            className="btn-group"
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {(props.hasMoveUp || props.hasMoveDown) && (
              <Button
                variant="light"
                style={btnStyle}
                tabIndex="-1"
                disabled={props.disabled || props.readonly || !props.hasMoveUp}
                onClick={props.onReorderClick(props.index, props.index - 1)}
              >
                <i className="fas fa-long-arrow-alt-up"></i>
              </Button>
            )}

            {(props.hasMoveUp || props.hasMoveDown) && (
              <Button
                variant="light"
                style={btnStyle}
                tabIndex="-1"
                disabled={
                  props.disabled || props.readonly || !props.hasMoveDown
                }
                onClick={props.onReorderClick(props.index, props.index + 1)}
              >
                <i className="fas fa-long-arrow-alt-down"></i>
              </Button>
            )}

            {props.hasRemove && (
              <Button
                variant="secondary"
                style={btnStyle}
                tabIndex="-1"
                disabled={props.disabled || props.readonly}
                onClick={props.onDropIndexClick(props.index)}
              >
                <i className="fas fa-times"></i>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ArrayFieldTemplate(props) {
  return (
    <fieldset className={props.className} id={props.idSchema.$id}>
      <ArrayFieldTitle
        key={`array-field-title-${props.idSchema.$id}`}
        TitleField={props.TitleField}
        idSchema={props.idSchema}
        title={props.uiSchema["ui:title"] || props.title}
        required={props.required}
      />

      {(props.uiSchema["ui:description"] || props.schema.description) && (
        <ArrayFieldDescription
          key={`array-field-description-${props.idSchema.$id}`}
          DescriptionField={props.DescriptionField}
          idSchema={props.idSchema}
          description={
            props.uiSchema["ui:description"] || props.schema.description
          }
        />
      )}

      <div
        className="array-item-list"
        key={`array-item-list-${props.idSchema.$id}`}
      >
        {props.items && props.items.map((p) => DefaultArrayItem(p))}
      </div>

      {props.canAdd && (
        <div className="row">
          <p className={"col array-item-add"}>
            <Button
              className="btn-add"
              variant="link"
              tabIndex="0"
              onClick={props.onAddClick}
              disabled={props.disabled || props.readonly}
            >
              <i className="fas fa-plus"></i>
            </Button>
          </p>
        </div>
      )}
    </fieldset>
  );
}

export default ArrayFieldTemplate;
