'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, ShoppingCart, MapPin, ChevronDown, FileText } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/lines', label: 'Productos' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contact', label: 'Contacto' },
    { href: '/blog', label: 'Blog' },
];

const catalogLinks = [
    { href: '/search', label: 'Catálogo Completo' },
    { href: '/catalogs/bombas.pdf', label: 'Bombas' },
    { href: '/catalogs/tomas.pdf', label: 'Tomas' },
    { href: '/catalogs/tubos.pdf', label: 'Tubos' },
    { href: '/catalogs/numeros-nuevos.pdf', label: 'Números Nuevos' },
    { href: '/catalogs/mangueras.pdf', label: 'Mangueras' },
]

const lineLinks = [
    { href: '/lines', label: 'Todas las Líneas' },
    { href: '/lines/bomba-de-agua', label: 'Bomba de Agua' },
    { href: '/lines/deposito-de-anticongelante', label: 'Depósito de Anticongelante' },
    { href: '/lines/filtros-de-aire', label: 'Filtros de Aire' },
    { href: '/lines/mangueras', label: 'Mangueras' },
    { href: '/lines/motoventiladores', label: 'Motoventiladores' },
    { href: '/lines/poleas-y-tensores', label: 'Poleas y Tensores' },
    { href: '/lines/radiadores', label: 'Radiadores' },
    { href: '/lines/soportes-de-motor-y-transmision', label: 'Soportes de Motor y Transmisión' },
    { href: '/lines/tapones', label: 'Tapones' },
    { href: '/lines/toma-de-agua', label: 'Toma de Agua' },
    { href: '/lines/tubos-de-enfriamiento', label: 'Tubos de Enfriamiento' },
    { href: '/lines/anticongelantes', label: 'Anticongelantes' },
    { href: '/lines/condensadores', label: 'Condensadores' },
]

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar - dark teal */}
      <div className="bg-polar-dark text-white text-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Jesus Cantu Leal #1423, Monterrey, Mexico</span>
          </div>
          <Link
            href="https://wa.me/5218116924693"
            target="_blank"
            className="flex items-center gap-2 hover:text-polar-cyan transition-colors"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span>+52 1 81 1692 4693</span>
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/Images/logop.png" alt="Polar Autopartes Logo" width={150} height={35} data-ai-hint="logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full transition-colors text-[15px]",
                  isActive(link.href)
                    ? "border-2 border-polar-dark text-polar-dark font-semibold"
                    : "text-gray-600 hover:text-polar-dark"
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* Catálogos dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 rounded-full transition-colors text-[15px] text-gray-600 hover:text-polar-dark inline-flex items-center gap-1 outline-none">
                Catálogos <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {catalogLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} target={link.href.endsWith('.pdf') ? '_blank' : undefined} className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* Cart icon */}
            <Link href="/search" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-polar-cyan text-white hover:bg-polar-cyan/90 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsOpen(false)}>
                       <Image src="/Images/logop.png" alt="Polar Autopartes Logo" width={150} height={35} data-ai-hint="logo" />
                    </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-lg font-semibold",
                          isActive(link.href) ? "text-polar-dark" : "text-gray-600"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-2">
                        <h3 className="text-lg font-semibold mb-2">Catálogos</h3>
                        {catalogLinks.map(link => (
                             <Link
                                key={link.href}
                                href={link.href}
                                className="block pl-4 py-2 text-muted-foreground"
                                onClick={() => setIsOpen(false)}
                                target={link.href.endsWith('.pdf') ? '_blank' : undefined}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-2">
                        <h3 className="text-lg font-semibold mb-2">Líneas</h3>
                        {lineLinks.map(link => (
                             <Link
                                key={link.href}
                                href={link.href}
                                className="block pl-4 py-2 text-muted-foreground"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
