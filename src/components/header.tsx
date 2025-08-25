'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import * as React from 'react';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/search', label: 'Catálogo' },
    { href: '/lines', label: 'Líneas' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/#contacto', label: 'Contacto' },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-[25px]">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://placehold.co/180x40.png" alt="Polar Autopartes Logo" width={180} height={40} data-ai-hint="logo" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-foreground/60 transition-colors hover:text-foreground/80">
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
                       <Image src="https://placehold.co/180x40.png" alt="Polar Autopartes Logo" width={180} height={40} data-ai-hint="logo" />
                    </Link>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map(link => (
                      <Link
                        key={link.href}
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
