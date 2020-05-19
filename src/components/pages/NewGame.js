import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import Container from '../helpers/Container';
import Box from '../helpers/Box';
import Button from '../helpers/Button';
import Modal from '../helpers/Modal';

import PinForm from '../core/PinForm';

import formActions from '../../store/actions/form';
import mainActions from '../../store/actions/main';
import { formTypes, gameTypes } from '../../utils/enums';

import { WebSocketContext } from '../providers/WebSocket';

const NewGame = ({
  className,
  form,
  showForm,
  hideForm,
  loading,
  createGame,
  error,
  verifyPin,
}) => {
  const ws = useContext(WebSocketContext);

  return (
    <div className={className}>
      <Container>
        <main className="mt-3">
          <Box>
            <Button
              size="large"
              outline
              disabled={loading}
              onClick={() => createGame({ type: gameTypes.PLAYERVSPLAYER, ws })}
            >
              Créer une partie
            </Button>
            <Button
              size="large"
              outline
              disabled={loading}
              onClick={() => showForm({ type: formTypes.CHECK_PIN })}
            >
              Rejoindre une partie
            </Button>
          </Box>
        </main>
      </Container>
      <Modal visible={form.visible && form.type === formTypes.CHECK_PIN}>
        <PinForm
          onCancel={hideForm}
          onSubmit={({ pin }) => verifyPin({ pin, ws })}
          error={error}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

NewGame.propTypes = {
  form: PropTypes.shape({
    visible: PropTypes.bool,
    type: PropTypes.string,
  }),
  showForm: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  createGame: PropTypes.func.isRequired,
  error: PropTypes.string,
  verifyPin: PropTypes.func.isRequired,
};

NewGame.defaultProps = {
  form: {},
  loading: false,
  error: null,
};

const mapStateToProps = (state) => {
  return {
    form: {
      visible: state.form.visible,
      type: state.form.type,
    },
    loading: state.main.loading,
    error: state.main.error,
  };
};

const actions = {
  showForm: formActions.showForm,
  hideForm: formActions.hideForm,
  createGame: mainActions.createGame,
  verifyPin: mainActions.verifyPin,
};

export default styled(connect(mapStateToProps, actions)(NewGame))`
  margin-top: 5rem;
`;
