import { render, screen, act, waitFor, fireEvent, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Home from './Home';

const mockPredictAge = jest.fn().mockImplementation(() => Promise.resolve({ data: { age: "25" } }));
jest.mock('./api', () => (
  jest.fn().mockImplementation(() => ({
    predictAge: jest.fn().mockImplementation(() => {
      return mockPredictAge();
    })
  }))
));

describe('Home:', () => {
  test('renders the title message', async () => {
    act(() => {
      render(<Home />);
    });

    expect(screen.getByTestId("home-app-text")).toBeInTheDocument();
    expect(screen.getByTestId("home-get-age")).toBeInTheDocument();
    expect(screen.getByTestId("home-get-age")).toBeDisabled();
    expect(screen.getByTestId("home-get-age-input")).toBeInTheDocument();

    act(() => {
      userEvent.type(screen.getByTestId('home-get-age-input').querySelector('input') as HTMLInputElement, "Lilia")
    });

    expect(screen.getByTestId("home-get-age")).toBeEnabled();
    act(() => {
      fireEvent.click(screen.getByTestId("home-get-age"));
    });

    await waitFor(() => screen.getByTestId("home-loading"), {
      timeout: 5000
    });

    expect(screen.getByTestId("home-age-value")).toBeInTheDocument();
    expect(screen.getByTestId("home-age-value")).toHaveTextContent("25");
    expect(screen.queryByTestId("home-loading")).not.toBeInTheDocument();
  });
})
