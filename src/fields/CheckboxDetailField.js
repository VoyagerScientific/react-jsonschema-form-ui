import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { schemaRequiresTrueValue } from "@rjsf/core/lib/utils";

class CheckboxDetailField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.schema.title,
            value : {
                boolean: false,
                detail: null
            },
            detail_required: false
        }
    }

    handleCheckBoxChange(event) {

        const bool = event.target.checked;
        let detail = bool ? this.state.value.detail : null;

        const newValue = {
            boolean: bool,
            detail: detail
        }

        this.setState(
            {
                value: newValue,
                detail_required: bool
            }, () => this.props.onChange(newValue));
        return;
    }

    handleDetailChange(event) {

        const bool = true;
        const detail = event.target.value

        const newValue = {
            boolean: bool,
            detail: detail
        }

        this.setState({value: newValue}, () => this.props.onChange(newValue));
        return;
    }

    render(){

        const {
            schema,
            idSchema,
            disabled,
            readonly,
            autofocus,
            onBlur,
            onFocus,
            registry
        } = this.props;

        const DescriptionField = registry.fields.DescriptionField;
        const detail_required = this.state.detail_required;

        const required = schemaRequiresTrueValue(schema);

        return (
            <div className={`field-checkbox-detail`}>
                <Form.Label>{this.title}</Form.Label>

                <div className={`mb-1 checkbox ${disabled || readonly ? "disabled" : ""}`}>
               
                    <div className={`mb-1`}>{this.props.schema.title}</div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input
                                    type="checkbox"
                                    className=""
                                    id={idSchema && idSchema.$id}
                                    checked={typeof this.state.value.boolean === "undefined" ? false : this.state.value.boolean}
                                    required={required}
                                    disabled={disabled || readonly}
                                    autoFocus={autofocus}
                                    onChange={event => this.handleCheckBoxChange(event)}
                                    onBlur={onBlur && idSchema && (event => onBlur(idSchema.$id, event.target.checked))}
                                    onFocus={onFocus && idSchema && (event => onFocus(idSchema.$id, event.target.checked))}
                                />
                            </div>
                        </div>
                        <input 
                            type="text" 
                            class="form-control" 
                            aria-label="Details" 
                            required={detail_required}
                            value={this.state.value.detail ? this.state.value.detail : ""}
                            disabled={disabled || readonly || !this.state.value.boolean}
                            onChange={event => this.handleDetailChange(event)}
                            placeholder={schema.placeholder}
                        />
                    </div>

                    {this.props.schema.description && (
                        <DescriptionField description={this.props.schema.description} />
                    )}
                </div>
            </div>
        );
    }

};

export default CheckboxDetailField;
