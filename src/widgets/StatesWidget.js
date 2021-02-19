import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { us_states } from "../helpers/us_states";

const StatesWidget = (props) => {
  const { title } = _.get(props, "schema", {});
  const state_abbreviations = Object.keys(us_states);
  return (
    <>
      <Form.Label>{title}</Form.Label>
      <select
        id={props.id}
        className="form-control"
        value={props.value}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
        disabled={props.disabled}
        readOnly={props.readonly}
      >
        <option value=""> </option>
        {state_abbreviations.map((state) => {
          return (
            <option key={state} value={state}>
              {state}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default StatesWidget;
