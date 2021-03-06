import React from 'react';
export default function LabelForm(props) {
    var className = props.required ? 'ant-form-item-required' : '';
    return <div className="ant-form-item-label"><label title={props.title} className={className} >{props.children}</label></div>
}