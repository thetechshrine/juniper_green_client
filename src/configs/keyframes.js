import { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(0)
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
`;

export default {
  pulse,
  zoomIn,
};
