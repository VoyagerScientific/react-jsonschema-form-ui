import React, { Component } from "react";


function HeadingField(props) {
  const {id, classNames, label, help, required, description, errors, children, schema} = props;
  return (
    <div className={classNames}>
      <legend style={{paddingTop: 15}}>{schema.title}</legend>
    </div>
  );
}

export default HeadingField;
