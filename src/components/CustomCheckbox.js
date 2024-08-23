// CustomCheckbox.js
import React from 'react';
import styled from 'styled-components';

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #007BFF;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    outline: none;

    &:checked {
        background-color: #007BFF;
    }

    &:checked::after {
        content: '\f00c';
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        color: white;
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 12px;
    }
`;

const CustomCheckbox = ({ checked, onChange }) => (
    <Checkbox checked={checked} onChange={onChange} />
);

export default CustomCheckbox;
