'use client';

import { blogPosts } from '@/lib/blog-posts';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Nuestro Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Consejos de expertos, guías de mantenimiento y las últimas noticias del mundo automotriz.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
            <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[4/3] w-full">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint="blog post topic"
                    />
                </div>
            </Link>
            <CardHeader>
              <Link href={`/blog/${post.slug}`}>
                <CardTitle className="font-headline text-xl hover:text-primary transition-colors">{post.title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-xs text-muted-foreground border-t pt-4">
               <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
               </div>
              <Link href={`/blog/${post.slug}`} className="text-primary font-semibold flex items-center gap-1 hover:underline">
                Leer más <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
