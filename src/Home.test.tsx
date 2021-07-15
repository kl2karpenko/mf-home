import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from './Home';

describe('Home:', () => {
  test('renders the title message', () => {
    render(<Home />);
    const homeText = screen.getByTestId('home-app-text');
    expect(homeText).toBeInTheDocument();
  });

  test('renders the title message', () => {
    render(<Home />);
    const homeText = screen.getByTestId('home-app-text');
    expect(homeText).toBeInTheDocument();
  });
})
