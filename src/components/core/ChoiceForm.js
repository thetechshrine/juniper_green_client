import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Input from '../helpers/Input';
import Box from '../helpers/Box';
import Button from '../helpers/Button';
import ErrorView from '../helpers/ErrorView';

import { Choice } from '../core/Choices';
import CountDown from '../core/CountDown';

const ChoiceForm = ({ className, onSubmit, onCancel, data }) => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setError(null);

    const { currentValue, playedValues } = data;

    if (!currentValue || currentValue === -1) {
      onSubmit({ value });
    } else {
      if (playedValues) {
        if (playedValues.includes(value)) {
          setError(`Le choix ${value} n'est plus disponible`);
        } else if (
          !(currentValue % value === 0 || value % currentValue === 0)
        ) {
          setError(
            `Votre choix doit être multiple ou diviseur de ${currentValue}`
          );
        } else {
          onSubmit({ value });
        }
      } else {
        console.log('undefined played values');
      }
    }
  };

  const countDown = useRef(null);
  useEffect(() => {
    countDown.current.reset(10);
  }, [data.currentPlayer]);

  const onTimeReached = () => {
    onSubmit({ value: -1 });
  };

  const handleCancel = () => {
    countDown.current.stopInterval();
    onCancel();
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <header>
        <Choice
          choice={{ value: data.currentValue, type: 'initial' }}
          withLabel={false}
        />
        <CountDown
          initialValue={10}
          ref={countDown}
          onTimeReached={onTimeReached}
        />
      </header>
      <Input
        label="Votre choix"
        type="number"
        min="1"
        max="100"
        fluid
        onChange={({ value }) => setValue(value)}
      />
      {error && <ErrorView>{error}</ErrorView>}
      <Box orientation="vertical">
        <Button type="submit" disabled={value !== 0 ? false : true}>
          Valider
        </Button>
        <Button color="secondary" onClick={handleCancel}>
          J'abandonne
        </Button>
      </Box>
    </form>
  );
};

ChoiceForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  data: PropTypes.shape({
    currentValue: PropTypes.number,
    playedValues: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

ChoiceForm.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
};

export default styled(ChoiceForm)`
  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
`;
