import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';

const renderApp = () => {
  const utils = render(<App />);
  return utils;
};

describe('App', () => {
  it('renders without crashing', () => {
    const { unmount } = renderApp();
    unmount();
  });
});
