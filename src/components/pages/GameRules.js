import React from 'react';

import styled from 'styled-components';

import Container from '../helpers/Container';
import Title from '../helpers/Title';

import colors from '../../configs/colors';

const rules = [
  {
    index: 1,
    content: 'Le joueur 1 choisit un nombre entre 1 et 100.',
  },
  {
    index: 2,
    content:
      'À tour de rôle, chaque joueur doit choisir un nombre parmi les multiples ou les diviseurs du nombre choisi précédemment par son adversaire et inférieur à 100.',
  },
  {
    index: 3,
    content: "Un nombre ne peut être joué qu'une seule fois.",
  },
  {
    index: 4,
    content:
      'Le perdant étant le joueur qui ne trouve plus de multiples ou de diviseurs communs au nombre précédemment choisi.',
  },
];

const GameRules = ({ className }) => {
  return (
    <div className={className}>
      <Container>
        <header>
          <Title label="Les règles du jeu" centered={false} />
        </header>
        <main>
          <ul>
            {rules.map((rule) => (
              <li key={rule.index}>
                <span>{rule.index}</span>
                <span>{rule.content}</span>
              </li>
            ))}
          </ul>
        </main>
      </Container>
    </div>
  );
};

export default styled(GameRules)`
  margin: 2rem 0;

  > ${Container} {
    > main {
      > ul {
        list-style: none;
        color: ${colors.accent};
        font-size: 1rem;
        padding: 2rem 0;

        li {
          margin: 0.5rem 0;
          display: flex;
          align-items: center;

          > span {
            :first-child {
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              background: ${colors.light};
              font-weight: 500;
              margin-right: 0.5rem;
            }

            :last-child {
              flex: 1;
            }
          }
        }
      }
    }
  }
`;
