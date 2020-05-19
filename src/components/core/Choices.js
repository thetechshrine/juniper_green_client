import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import colors from '../../configs/colors';
import keyframes from '../../configs/keyframes';

const UnStyledChoice = ({ className, choice, withLabel }) => {
  return (
    <div className={className}>
      <span>{choice.value !== -1 ? choice.value : '--'}</span>
      {withLabel && (
        <div>
          <span>{choice.type}</span>
          {choice.type !== 'initial' && (
            <span className="current">({choice.current})</span>
          )}
        </div>
      )}
    </div>
  );
};

UnStyledChoice.propTypes = {
  withLabel: PropTypes.bool,
};

UnStyledChoice.defaultProps = {
  withLabel: true,
};

const StyledChoice = styled(UnStyledChoice)`
  position: relative;
  display: inline-block;
  animation: ${keyframes.pulse} 800ms forwards;

  > span {
    width: 6rem;
    height: 6rem;
    font-size: 2.5rem;
    font-weight: 600;
    border: none;
    border-radius: 50%;
    background: ${colors.secondaryLight};
    color: ${colors.white};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 760px) {
      width: 4.5rem;
      height: 4.5rem;
      font-size: 2rem;
    }
  }

  > div {
    position: absolute;
    content: '';
    top: 1rem;
    left: 55%;
    background: ${colors.light};
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 2rem;

    @media (max-width: 760px) {
      left: 40%;
    }

    > span {
      :first-child {
        font-weight: 500;
      }

      &.current {
        font-weight: 600;
        margin-left: 0.25rem;
      }
    }
  }
`;

const Choices = ({ className, choices }) => {
  return (
    <div className={className}>
      {choices.map((choice) => (
        <StyledChoice key={choice.uuid} choice={choice} />
      ))}
    </div>
  );
};

Choices.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      value: PropTypes.number,
      type: PropTypes.string,
      current: PropTypes.number,
    })
  ),
};

Choices.defaultProps = {
  choices: [],
};

export default styled(Choices)`
  max-width: 9.5rem;
  display: grid;
  gap: 1.5rem;
  margin: 0 auto;
`;

export const Choice = StyledChoice;
