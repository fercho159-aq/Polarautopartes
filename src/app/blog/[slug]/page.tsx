'use client';

import { getPostBySlug } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ContactSection } from '@/components/contact-section';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article>
        <header className="mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint="blog post topic"
          />
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none text-foreground space-y-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
    <ContactSection />
    </>
  );
}
