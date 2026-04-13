import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavbarClient from './NavbarClient';

const navLinks = [
  { href: '/', label: 'Portfólio' },
  { href: '/sobre-mim', label: 'Sobre Mim' },
  { href: '/projetos', label: 'Projetos' },
];

describe('NavbarClient', () => {
  it('renders hamburger button', () => {
    render(<NavbarClient navLinks={navLinks} />);
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
  });

  it('does not show mobile menu by default', () => {
    render(<NavbarClient navLinks={navLinks} />);
    expect(screen.queryByText('Portfólio')).not.toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    render(<NavbarClient navLinks={navLinks} />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(screen.getByText('Portfólio')).toBeInTheDocument();
    expect(screen.getByText('Sobre Mim')).toBeInTheDocument();
    expect(screen.getByText('Projetos')).toBeInTheDocument();
  });

  it('shows Contato link in mobile menu', () => {
    render(<NavbarClient navLinks={navLinks} />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('closes mobile menu when a link is clicked', () => {
    render(<NavbarClient navLinks={navLinks} />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(screen.getByText('Portfólio')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Portfólio'));
    expect(screen.queryByText('Sobre Mim')).not.toBeInTheDocument();
  });

  it('toggles aria-expanded on hamburger button', () => {
    render(<NavbarClient navLinks={navLinks} />);
    const button = screen.getByLabelText('Abrir menu');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(screen.getByLabelText('Fechar menu')).toHaveAttribute('aria-expanded', 'true');
  });
});
