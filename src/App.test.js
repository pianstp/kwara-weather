import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the ATMOS weather dashboard', () => {
  render(<App />);
  expect(screen.getByText('ATMOS')).toBeInTheDocument();
});
