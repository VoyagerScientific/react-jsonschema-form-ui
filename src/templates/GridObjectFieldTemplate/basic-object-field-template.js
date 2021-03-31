import React from "react";
import AddButton from "@rjsf/core/lib/components/AddButton";
import { getUiOptions } from "@rjsf/core/lib/utils";

function BasicObjectFieldTemplate(props) {
  const { idSchema, TitleField, DescriptionField } = props;
  const canExpand = function canExpand() {
    const { formData, schema, uiSchema } = props;
    if (!schema.additionalProperties) {
      return false;
    }
    const { expandable } = getUiOptions(uiSchema);
    if (expandable === false) {
      return expandable;
    }
    // if ui:options.expandable was not explicitly set to false, we can add
    // another property if we have not exceeded maxProperties yet
    if (schema.maxProperties !== undefined) {
      return Object.keys(formData).length < schema.maxProperties;
    }
    return true;
  };

  return (
    <fieldset id={props.idSchema.$id}>
      {(props.uiSchema['ui:title'] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={props.title || props.uiSchema['ui:title']}
          required={props.required}
          formContext={props.formContext} />
      )}
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__description`}
          description={props.description}
          formContext={props.formContext} />
      )}
      {props.properties.map(prop => prop.content)}
      {canExpand() && (
        <AddButton
          className="object-property-expand"
          onClick={props.onAddClick(props.schema)}
          disabled={props.disabled || props.readonly} />
      )}
    </fieldset>
  );
}

export default BasicObjectFieldTemplate;