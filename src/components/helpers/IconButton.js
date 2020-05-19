import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import colors from '../../configs/colors';
import dimens from '../../configs/dimens';

const UnStyledIconButton = ({ className, children, icon, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <div>
        <span className="material-icons">{icon}</span>
        <span>{children}</span>
      </div>
    </button>
  );
};

const StyledIconButton = styled(UnStyledIconButton)`
  display: inline-block;
  background: transparent;
  padding: ${dimens.button.padding.normal};
  border: none;
  cursor: pointer;
  color: ${colors.white};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-size: ${dimens.button.fontSize.normal};
  transition: all 300ms ease-in-out;

  :focus,
  :hover {
    border-color: ${colors.white};
    outline: none;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const IconButton = (props) => <StyledIconButton {...props} />;

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  icon: 'arrow_back_ios',
  onClick: () => {},
};

export default IconButton;
