import * as React from 'react';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';

const override = css`
  position: absolute;
  transform: translate(-50%, -50%);
  display: block;
  margin: 0 auto;
`;

interface SpinnerProps {
  styles?: any;
  color?: string;
  size?: number;
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ styles, size, color, loading }) => (
  <GridLoader css={styles} size={size} color={color} loading={loading} />
);

Spinner.defaultProps = {
  styles: override,
  color: '#000000',
  size: 15,
};

export default Spinner;
