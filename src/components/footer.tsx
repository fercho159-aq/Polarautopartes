
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';


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
                <FaFacebook className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/polarautopartesmty?igsh=MWhxaTZzanBkdzZncA==" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6" />
              </Link>
              <Link href="https://youtube.com/@polarautopartesmty?si=tlXGMePgs8R1Gw5c" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="h-6 w-6" />
              </Link>
              <Link href="https://www.tiktok.com/@polarautopartesmty" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="h-6 w-6" />
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
