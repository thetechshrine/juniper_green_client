import React from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';

import colors from '../../configs/colors';

const Player = ({ className, myTurn, player }) => {
  return (
    <div className={className}>
      {myTurn && (
        <div>
          <span>
            <span className="material-icons">arrow_back_ios</span>
          </span>
        </div>
      )}
      <img src={player.avatar} alt="" />
      <span>{player.username}</span>
    </div>
  );
};

Player.propTypes = {
  myTurn: PropTypes.bool,
  player: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

Player.defaulProps = {
  myTurn: false,
  player: {},
};

const bouce = keyframes`
  from {
    top: -0.85rem;
  }
  to {
    top: 0;
  }
`;

export default styled(Player)`
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    display: inline-block;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;

    @media (max-width: 760px) {
      width: 2.8rem;
      height: 2.8rem;
    }
  }

  > div {
    position: relative;
    min-height: 2.5rem;
    display: flex;
    justify-content: center;

    > span {
      margin-bottom: 0.35rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: ${colors.secondary};
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(270deg);
      animation: ${bouce} 500ms ease-in-out infinite alternate;
      position: absolute;
      top: -0.85rem;

      > span {
        color: ${colors.white};
        font-size: 1.4rem;
        margin-left: 0.3rem;
      }
    }
  }

  > span {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.35rem;
    color: ${colors.primaryLight};

    @media (max-width: 760px) {
      font-size: 0.9rem;
    }
  }
`;
