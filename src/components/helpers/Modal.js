import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import colors from '../../configs/colors';
import keyframes from '../../configs/keyframes';

const UnStyledModal = ({ children, className, visible }) => {
  return ReactDOM.createPortal(
    <div className={`${className} ${visible ? 'visible' : ''}`}>
      <div>{children}</div>
    </div>,
    document.getElementById('modal')
  );
};

const StyledModal = styled(UnStyledModal)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: none;
  z-index: 1000;

  &.visible {
    display: block;
  }

  > div {
    width: 40%;
    margin: 5rem auto;
    background: ${colors.white};
    border-radius: 0.35rem;
    padding: 1rem;
    animation: ${keyframes.pulse} 300ms forwards;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);

    @media (max-width: 760px) {
      width: 80%;
    }
  }
`;

const Modal = (props) => <StyledModal {...props} />;

Modal.propTypes = {
  visible: PropTypes.bool,
};

Modal.defaultProps = {
  visible: false,
};

export default Modal;
