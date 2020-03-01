import React, { Component } from 'react';
import {us_states} from '../helpers/us_states';

const StatesWidget = (props) => {
  const state_abbreviations = Object.keys(us_states);
  return (
    <select id={props.id}
      className="form-control"
      value={props.value}
      required={props.required}
      onChange={(event) => props.onChange(event.target.value)} >
        <option value=""> </option>
      { state_abbreviations.map((state)=>{
        return (
          <option key={state} value={state}>{state}</option>
        );
      })}
    </select>
  );
}

export default StatesWidget;
