
'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Users } from "lucide-react";
import Image from "next/image";

export function ContactSection() {
    return (
        <section id="contacto" className="py-16 border-t bg-card">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Ponte en Contacto</h2>
                <div className="grid md:grid-cols-2 gap-12 p-8 rounded-lg">
                    <div>
                        <h3 className="font-headline text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="name-contact-section">Nombre</Label>
                                <Input id="name-contact-section" placeholder="Tu nombre completo" />
                            </div>
                            <div>
                                <Label htmlFor="email-contact-section">Email</Label>
                                <Input id="email-contact-section" type="email" placeholder="tu@email.com" />
                            </div>
                            <div>
                                <Label htmlFor="message-contact-section">Mensaje</Label>
                                <Textarea id="message-contact-section" placeholder="Escribe tu consulta aquí..." rows={5} />
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Enviar</Button>
                        </form>
                    </div>
                    <div>
                        <h3 className="font-headline text-2xl font-bold mb-6">Información de Contacto</h3>
                        <div className="space-y-6 text-muted-foreground">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold text-foreground">Dirección</p>
                                    <p>Av. de las Partes 123, Col. Industrial, C.P. 54000, Tlalnepantla, Estado de México.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold text-foreground">Teléfonos</p>
                                    <p>Ventas: (55) 5555-1234</p>
                                    <p>WhatsApp: (55) 9876-5432</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold text-foreground">Correos</p>
                                    <p>Ventas: ventas@polarautopartes.com</p>
                                    <p>Soporte Técnico: soporte@polarautopartes.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 h-64 w-full bg-muted rounded-lg overflow-hidden relative">
                            <Image src="https://placehold.co/600x400.png" alt="Mapa de ubicación" layout="fill" objectFit="cover" data-ai-hint="map location" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
