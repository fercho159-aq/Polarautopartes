
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

// Custom TikTok icon as it's not in lucide-react by default
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 7.5a4.5 4.5 0 0 1-4.5 4.5H12V4.5a2.5 2.5 0 0 1 5 0v3"/>
        <path d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"/>
    </svg>
)


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
              <Link href="https://www.facebook.com/polarautopartes?mibextid=ZbWKwL" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/polarautopartesmty?igsh=MWhxaTZzanBkdzZncA==" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://youtube.com/@polarautopartesmty?si=tlXGMePgs8R1Gw5c" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link href="https://www.tiktok.com/@polarautopartesmty" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <TikTokIcon className="h-6 w-6" />
              </Link>
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
