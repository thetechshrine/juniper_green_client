import styled from 'styled-components';

import colors from '../../configs/colors';
import keyframes from '../../configs/keyframes';

const ErrorView = styled.div`
  margin-bottom: 1rem;
  padding: 0.65rem 0.75rem;
  border-radius: 0.25rem;
  background: #bb3b0e;
  color: ${colors.white};
  font-size: 0.9rem;
  transform: scale(0);
  animation: ${keyframes.zoomIn} 500ms forwards;
`;

export default ErrorView;
