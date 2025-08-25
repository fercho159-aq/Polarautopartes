
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
               <Image src="https://placehold.co/180x40.png" alt="Polar Autopartes Logo" width={180} height={40} data-ai-hint="logo" />
            </Link>
            <p className="text-muted-foreground text-sm">
              Tu tienda de confianza para partes de vehículos.
            </p>
             <div className="mt-4">
                <h3 className="font-headline text-lg font-semibold mb-2">Aceptamos</h3>
                <div className="flex items-center gap-2">
                    <img src="https://placehold.co/40x25.png" alt="Visa" data-ai-hint="credit card logo" />
                    <img src="https://placehold.co/40x25.png" alt="Mastercard" data-ai-hint="credit card logo" />
                    <img src="https://placehold.co/40x25.png" alt="PayPal" data-ai-hint="payment logo" />
                </div>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Inicio</Link></li>
              <li><Link href="/search" className="text-sm text-muted-foreground hover:text-primary">Catálogo</Link></li>
              <li><Link href="/nosotros" className="text-sm text-muted-foreground hover:text-primary">Nosotros</Link></li>
              <li><Link href="/#contacto" className="text-sm text-muted-foreground hover:text-primary">Contacto</Link></li>
              <li><Link href="/how-to-buy" className="text-sm text-muted-foreground hover:text-primary">Cómo Comprar</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Términos y Condiciones</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Política de Devoluciones</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link href="/" className="text-muted-foreground hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></Link>
              <Link href="/" className="text-muted-foreground hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1-3.5 1.1c-1.3 1.2-2.8 2-4.5 2H6.5c-1 .9-2 1-3 1s-1.4-1.9-1.4-1.9s.7-.4 1.3-.8c-.7-.4-1-1-1.3-1.4s-.4-1.6-.4-1.6c.4.1 1.2.5 1.2.5s-1.2-2.1-1.2-3.1c0-.8.3-1.6.3-1.6s1.2 2.5 5.8 2.5c.2-2.3 1.1-4.8 4.6-4.8s4.5 2.1 4.5 2.1z"/></svg></Link>
              <Link href="/" className="text-muted-foreground hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Polar Autopartes. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
