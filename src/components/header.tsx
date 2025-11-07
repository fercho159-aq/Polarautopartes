'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/#contacto', label: 'Contacto' },
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
    { href: '/lines/motoventiladores', label: 'Motoventiladores' },
    { href: '/lines/radiadores', label: 'Radiadores' },
    { href: '/lines/soportes-de-motor-y-transmision', label: 'Soportes de Motor y Transmisión' },
    { href: '/lines/tapones', label: 'Tapones' },
    { href: '/lines/toma-de-agua', label: 'Toma de Agua' },
    { href: '/lines/tubos-de-enfriamiento', label: 'Tubos de Enfriamiento' },
]

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-[25px]">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Images/logop.png" alt="Polar Autopartes Logo" width={180} height={40} data-ai-hint="logo" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn("px-4 py-2 rounded-md transition-colors", pathname === link.href ? "bg-muted text-foreground font-semibold" : "text-foreground/60 hover:text-foreground/80")}
            >
              {link.label}
            </Link>
          ))}
          
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn("px-4 py-2 flex items-center gap-1", pathname.startsWith('/search') || pathname.startsWith('/catalogs') ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground/80")}>
                Catálogos
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {catalogLinks.map(link => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} target={link.href.endsWith('.pdf') ? '_blank' : undefined}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn("px-4 py-2 flex items-center gap-1", pathname.startsWith('/lines') ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground/80")}>
                Líneas
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {lineLinks.map(link => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                    <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsOpen(false)}>
                       <Image src="/Images/logop.png" alt="Polar Autopartes Logo" width={180} height={40} data-ai-hint="logo" />
                    </Link>
                  <nav className="flex flex-col gap-4">
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
    </header>
  );
}
