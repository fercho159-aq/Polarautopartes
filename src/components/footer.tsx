
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
               <Image src="/Images/logop.png" alt="Polar Autopartes Logo" width={180} height={40} data-ai-hint="logo" />
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
              <Link href="https://www.facebook.com/polarautopartes?mibextid=ZbWKwL" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></Link>
              <Link href="https://www.instagram.com/polarautopartesmty?igsh=MWhxaTZzanBkdzZncA==" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></Link>
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
