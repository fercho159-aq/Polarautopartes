'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Contáctanos
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para servirte.
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold">Nuestra Oficina</h3>
              <p className="text-muted-foreground">Jesus Cantu Leal #1423, Monterrey, Mexico</p>
            </div>
          </div>
            <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold">Teléfono</h3>
              <p className="text-muted-foreground">+52 81 1692 4693</p>
            </div>
          </div>
            <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold">Email</h3>
              <p className="text-muted-foreground">admon@polarautopartes.com</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Envíanos un Mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Tu nombre completo" />
              </div>
                <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
                <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Enviar Mensaje</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
