'use client';

import { blogPosts } from '@/lib/blog-posts';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, Calendar } from 'lucide-react';

export default function BlogIndexPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-polar-dark text-center mb-12">
          Bomba de Agua
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl border-0 shadow-md">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint="blog post topic"
                  />
                </div>
              </Link>
              <CardContent className="p-5 flex-grow">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-headline text-lg font-bold text-foreground hover:text-polar-dark transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-xs text-muted-foreground border-t px-5 py-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-polar-dark font-semibold flex items-center gap-1 hover:underline">
                  Leer más <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
