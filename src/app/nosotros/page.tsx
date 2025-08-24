
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Building, Globe, Heart, Lightbulb, MapPin, Phone, Rocket, ShieldCheck, Star, Target, ThumbsUp, Users, Wrench } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const teamMembers = [
  {
    name: 'Juan Pérez',
    role: 'Director General',
    avatar: 'https://placehold.co/200x200.png',
    bio: 'Con más de 20 años de experiencia en el sector automotriz, Juan lidera nuestra visión estratégica.'
  },
  {
    name: 'Ana García',
    role: 'Gerente de Ventas',
    avatar: 'https://placehold.co/200x200.png',
    bio: 'Ana se asegura de que cada cliente reciba la mejor atención y encuentre la pieza perfecta.'
  },
  {
    name: 'Luis Hernández',
    role: 'Jefe de Almacén',
    avatar: 'https://placehold.co/200x200.png',
    bio: 'Luis garantiza que nuestro inventario esté siempre al día y que los envíos salgan a tiempo.'
  },
];

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Taller Mecánico "El Rápido"',
    quote: 'La calidad de las bombas de agua es insuperable. Mis clientes notan la diferencia y yo tengo la confianza de instalar un producto duradero.',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Ana G.',
    role: 'Refaccionaria "Autopartes del Sur"',
    quote: 'El catálogo es muy completo y fácil de usar. Siempre encuentro la pieza exacta que necesito para los modelos más comerciales. ¡Excelente servicio!',
    avatar: 'https://placehold.co/100x100.png',
  },
];

const timeline = [
    { year: '2004', event: 'Nacimiento de Polar Autopartes', description: 'Fundamos la empresa con la misión de ofrecer refacciones de alta calidad para el sistema de enfriamiento.' },
    { year: '2010', event: 'Primera Expansión', description: 'Ampliamos nuestro catálogo para incluir nuevas líneas de productos y duplicamos nuestro almacén.' },
    { year: '2015', event: 'Lanzamiento E-commerce', description: 'Inauguramos nuestra primera tienda en línea, llegando a clientes en todo el país.' },
    { year: '2023', event: 'Líderes en Cobertura', description: 'Alcanzamos una cobertura del 80% del parque vehicular nacional, consolidándonos como referentes.' },
];

export default function NosotrosPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Encabezado + Introducción */}
      <section className="relative text-center py-20 bg-card">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1920x800.png"
            alt="Equipo de Polar Autopartes trabajando"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
            data-ai-hint="team working automotive"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Conoce Quiénes Somos
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Somos más que un distribuidor de autopartes; somos tu aliado de confianza para mantener los vehículos de México en movimiento. Desde el 2004, nos dedicamos a resolver el principal problema de nuestros clientes: encontrar refacciones de calidad para el sistema de enfriamiento con la cobertura más amplia y un servicio excepcional.
          </p>
        </div>
      </section>
      
      <Separator />

      {/* 2. Propósito / Misión / Visión / Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-bold mb-2">Misión</h3>
              <p className="text-muted-foreground">Proveer soluciones de enfriamiento automotriz confiables y accesibles, garantizando el rendimiento y la durabilidad que nuestros clientes merecen.</p>
            </Card>
            <Card className="text-center p-6">
              <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-bold mb-2">Visión</h3>
              <p className="text-muted-foreground">Ser la empresa líder y de primera elección en México para refacciones del sistema de enfriamiento, reconocida por nuestra innovación, calidad y cobertura.</p>
            </Card>
            <Card className="text-center p-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-bold mb-2">Valores</h3>
              <ul className="text-muted-foreground list-none space-y-1">
                <li><strong className="text-foreground">Confianza:</strong> Productos que inspiran seguridad.</li>
                <li><strong className="text-foreground">Innovación:</strong> Catálogo siempre a la vanguardia.</li>
                <li><strong className="text-foreground">Responsabilidad:</strong> Compromiso con cada cliente.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Historia o recorrido */}
      <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Nuestra Trayectoria</h2>
              <div className="relative">
                  <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
                  {timeline.map((item, index) => (
                      <div key={item.year} className={`relative mb-12 md:mb-8 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                          <div className={`w-full md:w-5/12 p-4`}>
                              <Card className="p-6 hover:shadow-xl transition-shadow">
                                <p className="text-primary font-bold text-lg mb-2">{item.year}</p>
                                <h4 className="font-headline text-xl font-bold mb-2">{item.event}</h4>
                                <p className="text-muted-foreground">{item.description}</p>
                              </Card>
                          </div>
                          <div className="absolute md:relative z-10 flex items-center justify-center w-10 h-10 bg-primary rounded-full ring-4 ring-background left-1/2 -translate-x-1/2 md:translate-x-0">
                            <Award className="text-primary-foreground"/>
                          </div>
                           <div className="w-full md:w-5/12 p-4"></div>
                      </div>
                  ))}
              </div>
          </div>
      </section>


      {/* 4. Equipo humano */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Nuestro Equipo</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">Detrás de cada pieza hay un equipo de profesionales apasionados por el mundo automotriz, listos para ayudarte.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden">
                <div className="relative h-48 w-full bg-muted">
                     <Image src={member.avatar} alt={member.name} layout="fill" objectFit="cover" data-ai-hint="person portrait"/>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-headline text-xl font-bold">{member.name}</h4>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Por qué elegirnos */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">¿Por Qué Elegir Polar Autopartes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><ShieldCheck className="h-6 w-6 text-primary" /></div>
              <div>
                <h4 className="font-headline text-xl font-bold">Calidad Garantizada</h4>
                <p className="text-muted-foreground">Solo ofrecemos productos que cumplen con los más altos estándares de la industria.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><Globe className="h-6 w-6 text-primary" /></div>
              <div>
                <h4 className="font-headline text-xl font-bold">Amplia Cobertura</h4>
                <p className="text-muted-foreground">Nuestro catálogo cubre la mayoría de los vehículos que circulan en México.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><ThumbsUp className="h-6 w-6 text-primary" /></div>
              <div>
                <h4 className="font-headline text-xl font-bold">Atención Personalizada</h4>
                <p className="text-muted-foreground">Nuestro equipo de expertos está listo para asesorarte en cada paso de tu compra.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Prueba social */}
       <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Lo que Dicen Nuestros Clientes</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-card">
                        <CardHeader>
                          <div className="flex items-center mb-4">
                            <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} className="rounded-full mr-4" data-ai-hint="person portrait"/>
                            <div>
                              <p className="font-bold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                          <blockquote className="text-muted-foreground italic">"{testimonial.quote}"</blockquote>
                        </CardHeader>
                        <CardContent>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                          </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </section>

      {/* 8. Llamado a la acción (CTA) */}
      <section className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-headline font-bold mb-4">¿Listo para encontrar tu refacción?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">Explora nuestro catálogo y descubre por qué miles de talleres y refaccionarias confían en nosotros.</p>
                <Button asChild size="lg" variant="secondary" className="text-secondary-foreground hover:bg-white/90 font-bold text-lg px-10 py-6">
                    <Link href="/search">Ir al Catálogo</Link>
                </Button>
            </div>
        </section>

    </div>
  );
}
