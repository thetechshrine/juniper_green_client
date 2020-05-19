import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { v1 as uuid } from 'uuid';

import dimens from '../../configs/dimens';
import colors from '../../configs/colors';

const UnStyledInput = ({ className, id, label, type, min, max, onChange }) => {
  const defaultId = id || uuid();

  const handleChange = (evt) => {
    const { value, valueAsNumber } = evt.target;
    onChange({
      value: type === 'text' ? value : isNaN(valueAsNumber) ? 0 : valueAsNumber,
    });
  };

  const handleKeyPress = (evt) => {
    if (type === 'number') {
      const { key, charCode } = evt;
      let { value } = evt.target;
      value += `${key}`;

      if (charCode < 48 || charCode > 57) evt.preventDefault();
      if (min && Number(value) < Number(min)) evt.preventDefault();
      if (max && Number(value) > Number(max)) evt.preventDefault();
    }
  };

  return (
    <div className={className}>
      {label && <label htmlFor={defaultId}>{label}</label>}
      <input
        id={defaultId}
        type={type}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

const StyledInput = styled(UnStyledInput)`
  margin: 1rem 0;

  > label {
    display: block;
    font-size: 0.9rem;
    color: ${colors.accent};
    margin-bottom: 0.25rem;
  }

  > input {
    display: ${(props) => (props.fluid ? 'block' : 'inline-block')};
    width: ${(props) => (props.fluid ? '100%' : 'initial')};
    padding: ${dimens.input.padding};
    border: 1px solid #a1e6e3;
    border-radius: 0.25rem;
    transition: all 200ms ease-out;
    font-size: ${dimens.input.fontSize};

    &[type='number'] {
      /* Chrome, Safari, Edge, Opera */
      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      -moz-appearance: textfield;
      font-family: 'Montserrat', sans-serif;
    }

    :focus {
      border-color: #a6b1e1;
      outline: none;
    }
  }
`;

const Input = (props) => <StyledInput {...props} />;

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number']),
  label: PropTypes.string,
  onChange: PropTypes.func,
  fluid: PropTypes.bool,
  min: PropTypes.string,
  max: PropTypes.string,
  id: PropTypes.string,
};

Input.defaultProps = {
  id: null,
  label: null,
  type: 'text',
  onChange: () => {},
  fluid: false,
  min: '',
  max: '',
};

export default Input;
