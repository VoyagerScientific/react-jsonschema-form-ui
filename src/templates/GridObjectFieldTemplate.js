import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import AddButton from "@rjsf/core/lib/components/AddButton";
import { getUiOptions } from "@rjsf/core/lib/utils";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DEFAULT_COLS = { lg: 32, md: 32, sm: 32, xs: 32, xxs: 32 };
const DEFAULT_BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const DEFAULT_GRID_LAYOUT = { x: 0, y: 0, w: 32, h: 1 };

function GridObjectFieldTemplate(props) {
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

  const renderChild = (prop) => {
    const gridLayout = _.get(prop, "content.props.uiSchema.layout");
    return <div key={prop.name} data-grid={gridLayout || DEFAULT_GRID_LAYOUT}>
      {prop.content}
    </div>;
  }

  const { idSchema, TitleField, DescriptionField } = props;

  if (idSchema.$id === "root") {
    const cols = _.get(props, "uiSchema.ui:options.cols");
    const breakpoints = _.get(props, "uiSchema.ui:options.breakpoints");
    return (
      <ResponsiveGridLayout
        layout="layout"
        breakpoints={_.isObject(breakpoints) ? breakpoints : DEFAULT_BREAKPOINTS}
        cols={_.isObject(cols) ? cols : DEFAULT_COLS}
        autoSize
        rowHeight={150}
        isResizable={false}
        isDraggable={false}
      >
        {props.properties.map(prop => renderChild(prop))}
      </ResponsiveGridLayout>
    )
  }

  return (
    <fieldset id={props.idSchema.$id}>
      {(props.uiSchema["ui:title"] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={props.title || props.uiSchema["ui:title"]}
          required={props.required}
          formContext={props.formContext}
        />
      )}
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__descrip tion`}
          description={props.description}
          formContext={props.formContext}
        />
      )}
      {props.properties.map(prop => prop.content)}
      {canExpand() && (
        <AddButton
          className="object-property-expand"
          onClick={props.onAddClick(props.schema)}
          disabled={props.disabled || props.readonly}
        />
      )}
    </fieldset>
  );
}

export default GridObjectFieldTemplate;