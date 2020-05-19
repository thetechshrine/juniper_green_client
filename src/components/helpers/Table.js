import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import colors from '../../configs/colors';

const icons = {
  multiple: 'arrow_upward',
  diviseur: 'arrow_downward',
  initial: 'arrow_downward',
};

const Table = ({ className, player }) => {
  const [choices, setChoices] = useState([]);
  useEffect(() => {
    if (player.choices.length > 0) {
      if (player.winner) {
        setChoices(player.choices);
      } else {
        setChoices(player.choices.filter((choice) => choice.value !== -1));
      }
    }
  }, [player]);

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>
            <img src={player.avatar} alt="" />
            <span>{player.username}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {choices.map((choice) => (
          <tr key={choice.uuid}>
            <td className={choice.type}>
              <span>{choice.value !== -1 ? choice.value : ''}</span>
              <span className="material-icons">{icons[choice.type]}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  player: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.string,
        value: PropTypes.number,
        type: PropTypes.string,
        current: PropTypes.number,
      })
    ),
  }),
};

Table.defaultProps = {
  player: {
    choices: [],
  },
};

export default styled(Table)`
  border-collapse: collapse;
  border-spacing: 0;

  td,
  th {
    border: 1px solid #c2f0fc;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
  }

  th {
    border-bottom-width: 0.2rem;
    justify-content: center;
  }

  td {
    border-top-width: 0px;
    justify-content: space-between;
  }

  > thead {
    > tr {
      > th {
        > img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }

        > span {
          font-size: 1.2rem;
          margin-left: 0.5rem;
        }
      }
    }
  }

  > tbody {
    > tr {
      > td {
        > span {
          :first-child {
            font-size: 1rem;
            font-weight: 600;
          }
        }

        &.multiple {
          background: ${colors.secondaryLight};
          color: ${colors.white};
        }

        &.diviseur {
          background: ${colors.light};
        }

        &.initial {
          > span {
            &.material-icons {
              opacity: 0;
            }
          }
        }
      }
    }
  }
`;
