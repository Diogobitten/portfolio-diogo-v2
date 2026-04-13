import Link from 'next/link';
import Image from 'next/image';
import NavbarClient from './NavbarClient';
import WeatherWidget from './WeatherWidget';
import CurrencyWidget from './CurrencyWidget';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_LINKS = [
  { href: '/', label: 'Portfólio' },
  { href: '/sobre-mim', label: 'Sobre Mim' },
  { href: '/projetos', label: 'Projetos' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-text-primary">
          <Image src="/img/db.png" alt="DB Logo" width={28} height={28} />
          <span className="text-lg font-semibold">Diogo Bittencourt</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Widgets */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <WeatherWidget />
            <CurrencyWidget />
          </div>

          {/* Contato button */}
          <Link
            href="#contato"
            className="rounded-md border border-text-secondary px-4 py-1.5 text-sm text-text-primary hover:bg-surface-light transition-colors"
          >
            Contato
          </Link>
        </div>

        {/* Mobile menu (Client Component) */}
        <NavbarClient navLinks={NAV_LINKS} />
      </nav>
    </header>
  );
}
