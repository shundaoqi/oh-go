import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders loading spinner', () => {
    render(<Loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with message when provided', () => {
    const message = 'Loading data...';
    render(<Loading message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders full screen loading when fullScreen is true', () => {
    render(<Loading fullScreen />);
    const container = screen.getByRole('progressbar').closest('div')?.parentElement;
    expect(container).toHaveClass('fixed');
  });
});