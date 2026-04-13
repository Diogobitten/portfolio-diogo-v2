import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the logo text "Diogo Bittencourt"', () => {
    render(<Navbar />);
    expect(screen.getByText('Diogo Bittencourt')).toBeInTheDocument();
  });

  it('renders the code icon </>', () => {
    render(<Navbar />);
    expect(screen.getByText('</>')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<Navbar />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/sobre-mim');
    expect(hrefs).toContain('/projetos');
  });

  it('renders Contato button with border style', () => {
    render(<Navbar />);
    const contatoLinks = screen.getAllByText('Contato');
    // Desktop version
    const desktopContato = contatoLinks[0];
    expect(desktopContato.className).toContain('border');
    expect(desktopContato).toHaveAttribute('href', '#contato');
  });

  it('has sticky positioning with backdrop blur', () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector('header');
    expect(header?.className).toContain('sticky');
    expect(header?.className).toContain('top-0');
    expect(header?.className).toContain('backdrop-blur-md');
  });

  it('renders widget components', () => {
    render(<Navbar />);
    expect(screen.getByLabelText('language-switcher')).toBeInTheDocument();
  });
});
