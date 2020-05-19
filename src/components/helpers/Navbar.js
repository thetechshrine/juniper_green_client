import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import colors from '../../configs/colors';
import navigationActions from '../../store/actions/navigation';

import IconButton from './IconButton';

const Navbar = ({ className, back, children }) => {
  return (
    <div className={className}>
      <IconButton onClick={() => back()}>Retour</IconButton>
    </div>
  );
};

Navbar.propTypes = {
  back: PropTypes.func.isRequired,
};

const actions = {
  back: navigationActions.back,
};

export default styled(connect(null, actions)(Navbar))`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  border-radius: 0;
  background: ${colors.primaryDark};
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 2;
  color: ${colors.white};
  display: flex;
`;
