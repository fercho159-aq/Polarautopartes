

'use client';

import Link from 'next/link';
import { Menu, Wrench } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import * as React from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/search', label: 'Búsqueda' },
  { href: '/lines', label: 'Líneas' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#opiniones', label: 'Opiniones' },
  { href: '/#contacto', label: 'Contacto' },
  { href: '/search', label: 'Catálogo' },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">Polar Autopartes</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href + link.label} href={link.href} className="text-foreground/60 transition-colors hover:text-foreground/80">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <Wrench className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">Polar Autopartes</span>
                    </Link>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map(link => (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        className="text-lg font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
