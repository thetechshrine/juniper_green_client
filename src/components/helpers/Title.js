import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const UnStyledTitle = ({ className, label, size }) => {
  return size === 'large' ? (
    <h1 className={`${className} ${size}`}>{label}</h1>
  ) : (
    <h2 className={`${className} ${size}`}>{label}</h2>
  );
};

const StyledTitle = styled(UnStyledTitle)`
  text-align: ${(props) => (props.centered ? 'center' : 'left')};
  flex: 1;

  &.large {
    font-size: 6rem;
    line-height: 1.5;

    @media (max-width: 760px) {
      line-height: 1.1;
      font-size: 4rem;
    }
  }

  &.medium {
    font-size: 2.8rem;
    font-weight: 600;

    @media (max-width: 760px) {
      font-size: 1.8rem;
    }
  }
`;

const Title = (props) => <StyledTitle {...props} />;

Title.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium', '']),
  centered: PropTypes.bool,
};

Title.defaultProps = {
  label: '',
  size: 'medium',
  centered: true,
};

export default Title;
