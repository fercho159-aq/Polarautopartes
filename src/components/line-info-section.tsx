import Image from 'next/image';

interface Step {
  text: string;
}

interface LineInfoSectionProps {
  title: string;
  description: string;
  quote: string;
  steps: Step[];
  anatomyImage: string;
  anatomyImageAlt: string;
}

export function LineInfoSection({
  title,
  description,
  quote,
  steps,
  anatomyImage,
  anatomyImageAlt,
}: LineInfoSectionProps) {
  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-headline font-bold text-2xl md:text-3xl text-foreground mb-6 flex items-center gap-3">
          <span className="inline-block w-1 h-7 bg-polar-dark rounded-full" />
          ¿Qué es {title}?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Anatomy image */}
          <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-[4/3]">
            <Image
              src={anatomyImage}
              alt={anatomyImageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Info content */}
          <div className="flex flex-col gap-5">
            <p className="text-muted-foreground leading-relaxed">{description}</p>

            <blockquote className="border-l-4 border-polar-dark pl-4 bg-polar-dark/5 py-3 pr-4 rounded-r-lg">
              <p className="text-sm font-medium text-foreground italic">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>

            <div>
              <h3 className="font-headline font-bold text-base mb-3 text-foreground">
                Cómo funciona
              </h3>
              <ol className="space-y-2">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-polar-dark text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {step.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
