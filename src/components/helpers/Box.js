import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const UnStyledBox = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

const StyledBox = styled(UnStyledBox)`
  display: grid;
  grid-template-rows: ${(props) =>
    props.orientation === 'horizontal' ? '1fr 1fr' : 'none'};
  grid-template-columns: ${(props) =>
    props.orientation === 'vertical' ? '1fr 1fr' : 'none'};
  gap: 1rem;
  justify-content: center;
`;

const Box = (props) => <StyledBox {...props} />;

Box.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical', '']),
};

Box.defaultProps = {
  orientation: 'horizontal',
};

export default Box;
