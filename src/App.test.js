import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Word Disks app bar', () => {
  render(<App />);
  const element = screen.getByText(/Word Disks/i);
  expect(element).toBeInTheDocument();
});
