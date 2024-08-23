import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('should select workflow', () => {
    render(<App />);

    // Use the test ID to select the dropdown
    const select = screen.getByTestId('workflowSelector');

    // Simulate selecting a workflow
    fireEvent.change(select, { target: { value: 'RC2, LB1, LB2, F2, F8, F4, F5, F6, F7, M1, E1, N2, C2' } });
  });
});
