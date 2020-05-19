import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import colors from '../../configs/colors';

const Value = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background: ${colors.primaryDark};
  color: ${colors.white};
  font-weight: 600;
  padding: 1.5rem 1rem;
  border: 1px solid ${colors.white};
`;

const Values = ({ className, values }) => {
  return (
    <div className={className}>
      {values.map((value, index) => (
        <Value key={index}>{value}</Value>
      ))}
    </div>
  );
};

Values.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number),
};

Values.defaultProps = {
  values: [],
};

export default styled(Values)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  margin: 0 auto;
`;
