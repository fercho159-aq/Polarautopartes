
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
               <Image src="/Images/polar-logo.png" alt="Polar Autopartes Logo" width={152} height={50} data-ai-hint="logo" />
            </Link>
            <p className="text-polar-dark text-sm font-medium">
              Tu tienda de confianza<br />para partes de vehículos.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-headline text-lg font-bold mb-4 text-foreground">Navegación</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-polar-cyan hover:text-polar-dark transition-colors">Inicio</Link></li>
              <li><Link href="/search" className="text-sm text-polar-cyan hover:text-polar-dark transition-colors">Catálogo</Link></li>
              <li><Link href="/nosotros" className="text-sm text-polar-cyan hover:text-polar-dark transition-colors">Nosotros</Link></li>
              <li><Link href="/contact" className="text-sm text-polar-cyan hover:text-polar-dark transition-colors">Contacto</Link></li>
              <li><Link href="/how-to-buy" className="text-sm text-polar-cyan hover:text-polar-dark transition-colors">Cómo Comprar</Link></li>
            </ul>
          </div>

          {/* Legal + Síguenos */}
          <div>
            <h3 className="font-headline text-lg font-bold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-polar-dark transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-polar-dark transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-polar-dark transition-colors">Política de Devoluciones</Link></li>
            </ul>
            <h3 className="font-headline text-lg font-bold mt-6 mb-4 text-foreground">Síguenos</h3>
            <div className="flex space-x-3">
              <Link href="https://www.instagram.com/polarautopartesmty" className="text-foreground hover:text-polar-cyan transition-colors" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6" />
              </Link>
              <Link href="https://www.facebook.com/polarautopartes" className="text-foreground hover:text-polar-cyan transition-colors" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="h-6 w-6" />
              </Link>
              <Link href="https://wa.me/5218116924693" className="text-foreground hover:text-polar-cyan transition-colors" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="h-6 w-6" />
              </Link>
              <Link href="https://youtube.com/@polarautopartesmty" className="text-foreground hover:text-polar-cyan transition-colors" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="h-6 w-6" />
              </Link>
              <Link href="https://www.tiktok.com/@polarautopartesmty" className="text-foreground hover:text-polar-cyan transition-colors" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="font-headline text-lg font-bold mb-4 text-foreground">Información de Contacto</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Dirección</p>
              <p>Jesus Cantu Leal #1423, Monterrey, Mexico</p>
              <p className="pt-2">WhatsApp: +52 1 81 1692 4693</p>
              <p className="pt-2"><span className="font-semibold text-foreground">Correos:</span> admon@polarautopartes.com</p>
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
