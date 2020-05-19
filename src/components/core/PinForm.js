import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../helpers/Input';
import Box from '../helpers/Box';
import Button from '../helpers/Button';
import ErrorView from '../helpers/ErrorView';

const PinForm = ({ className, error, loading, onSubmit, onCancel }) => {
  const [pin, setPin] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (pin && pin.length === 6) onSubmit({ pin });
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Input
        type="text"
        label="Entrer le PIN"
        fluid
        onChange={({ value }) => setPin(value)}
      />
      {error && <ErrorView>{error}</ErrorView>}
      <Box orientation="vertical">
        <Button type="submit" disabled={(pin ? false : true) || loading}>
          Valider
        </Button>
        <Button color="secondary" onClick={onCancel} disabled={loading}>
          Annuler
        </Button>
      </Box>
    </form>
  );
};

PinForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

PinForm.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
  error: null,
};

export default PinForm;
