import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import colors from '../../configs/colors';
import dimens from '../../configs/dimens';

const UnStyledButton = ({
  children,
  className,
  outline,
  type,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`${className} ${outline ? 'outline' : ''} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const StyledButton = styled(UnStyledButton)`
  display: ${(props) => (props.fluid ? 'flex' : 'inline-block')};
  width: ${(props) => (props.fluid ? '100%' : 'initial')};
  justify-content: center;
  padding: ${(props) => dimens.button.padding[props.size]};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  background: ${(props) => colors[props.color]};
  color: ${colors.white};
  font-size: ${(props) => dimens.button.fontSize[props.size]};
  transition: all 300ms ease-in-out;
  font-weight: 500;
  position: relative;

  @media (max-width: 760px) {
    font-size: ${(props) => dimens.button.fontSize.phone[props.size]};
  }

  :hover {
    background: ${(props) => colors[`${props.color}Light`]};
  }

  :focus {
    outline: none;
  }

  &.outline {
    border: 1px solid ${(props) => colors[props.color]};
    background: ${colors.white};
    color: ${(props) => colors[props.color]};

    :hover {
      background: ${(props) => colors[`${props.color}Light`]};
      color: ${colors.white};
    }
  }

  &.disabled {
    border: 1px solid rgba(255, 255, 255, 0.8);
    cursor: not-allowed;

    :hover {
      background: ${(props) => colors[props.color]};
    }

    ::after {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: 0.25rem;
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const Button = (props) => <StyledButton {...props} />;

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', '']),
  size: PropTypes.oneOf(['normal', 'large', '']),
  color: PropTypes.oneOf(['primary', 'secondary', '']),
  outline: PropTypes.bool,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  size: 'normal',
  color: 'primary',
  outline: false,
  className: '',
  fluid: false,
  disabled: false,
  onClick: () => {},
};

export default Button;
