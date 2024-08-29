import React from 'react';
import { render, screen } from '@testing-library/react';
import TabContent from './components/TabContent';

describe('TabContent Component', () => {
  it('renders FormTab when tabKey starts with F', () => {
    render(<TabContent tabKey="F1" groups={[]} />);
  });

  it('renders MediaTab when tabKey starts with M', () => {
    render(<TabContent tabKey="M1"/>);
  });

  it('renders ShareTab when tabKey starts with E', () => {
    render(<TabContent tabKey="E1"/>);
  });

  it('renders UploadTab when tabKey starts with C', () => {
    render(<TabContent tabKey="C1"/>);
  });

  it('renders Unhandled Tab Type when tabKey does not match', () => {
    render(<TabContent tabKey="X1"/>);
  });
});
