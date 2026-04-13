import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { SOCIAL_LINKS } from '@/lib/constants';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(
      screen.getByText('© 2025 Diogo Bittencourt. Todos os direitos reservados.')
    ).toBeInTheDocument();
  });

  it('renders GitHub link pointing to correct URL', () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveAttribute('href', SOCIAL_LINKS.github);
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders LinkedIn link pointing to correct URL', () => {
    render(<Footer />);
    const linkedinLink = screen.getByLabelText('LinkedIn');
    expect(linkedinLink).toHaveAttribute('href', SOCIAL_LINKS.linkedin);
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  it('applies dark theme styling', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer?.className).toContain('border-t');
    expect(footer?.className).toContain('border-border');
    expect(footer?.className).toContain('bg-surface');
  });
});
