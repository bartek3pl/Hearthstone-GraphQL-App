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
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => (
  <GridLoader css={override} size={50} color="#000000" loading={loading} />
);

export default Spinner;
