import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App component', () => {
  // Test to check if the sidebar is rendered
  test('renders the sidebar', () => {
    render(<App />);
    const sidebar = screen.getByText(/Workflow Properties/i);
    expect(sidebar).toBeInTheDocument();
  });

  // Test to check if the tab container is rendered
  test('renders the tab container', () => {
    render(<App />);
    const tabContainer = screen.getByText(/Add New Tab/i);
    expect(tabContainer).toBeInTheDocument();
  });
});
