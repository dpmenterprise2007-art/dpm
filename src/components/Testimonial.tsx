import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial as TestimonialType } from '@/lib/testimonials';

interface TestimonialProps {
  testimonial: TestimonialType;
}

export default function Testimonial({ testimonial }: TestimonialProps) {
  const { name, designation, company, projectType, location, rating, testimonial: text, image, projectValue, completionYear } = testimonial;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < rating
                  ? 'fill-accent text-accent'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-muted-foreground mb-6 leading-relaxed italic">
          "{text}"
        </p>

        {/* Client Info */}
        <div className="flex items-start gap-4 pt-4 border-t">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-lg">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">
              {designation}, {company}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                {projectType}
              </span>
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded">
                {location}
              </span>
              {projectValue && (
                <span className="bg-accent/10 text-accent px-2 py-1 rounded">
                  {projectValue}
                </span>
              )}
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded">
                {completionYear}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
