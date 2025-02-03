import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HelloButton from './HelloButton';

test('displays message when button is clicked', () => {
  render(<HelloButton />);
  
  const button = screen.getByText('Click Me');
  fireEvent.click(button);
  
  expect(screen.getByText('Hello, Tamar!')).toBeInTheDocument();
});
