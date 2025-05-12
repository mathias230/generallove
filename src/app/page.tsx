import MemoryCarousel from '@/components/memory-carousel';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10" />
          Our Cherished Moments
          <Sparkles className="w-10 h-10" />
        </h1>
        <p className="text-xl text-muted-foreground">
          A collection of memories that tell our beautiful story.
        </p>
      </header>
      <MemoryCarousel />
    </div>
  );
}
