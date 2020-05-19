import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import colors from '../../configs/colors';

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
  }

  componentDidMount() {
    const { onTimeReached } = this.props;

    this.interval = setInterval(() => {
      if (this.state.value > 0) {
        this.setState({
          value: this.state.value - 1,
        });
      } else {
        onTimeReached();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  stopInterval = () => {
    if (this.interval) clearInterval(this.interval);
  };

  reset = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { className } = this.props;

    return <span className={className}>{this.state.value}</span>;
  }
}

CountDown.propTypes = {
  initialValue: PropTypes.number.isRequired,
  onTimeReached: PropTypes.func,
};

CountDown.defaultProps = {
  onTimeReached: () => {},
};

export default styled(CountDown)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${colors.light};
  color: ${colors.primary};
  font-weight: 600;
  font-size: 2rem;
`;
