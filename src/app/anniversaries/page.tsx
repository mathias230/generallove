
import Link from 'next/link'; // Import Link for navigation
import { Button } from '@/components/ui/button'; // Import Button component
import { Gift, Sparkles } from 'lucide-react';

export default function AnniversariesPage() {
  return (
    <div className="space-y-8 flex flex-col items-center"> {/* Center content */}
      <header className="text-center w-full">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <Gift className="w-8 h-8" />
            Nuestros Aniversarios
        </h1>
        <p className="text-lg text-muted-foreground">Celebrando los hitos de nuestro amor.</p>
      </header>

      <div className="mt-12 flex flex-wrap justify-center gap-4"> {/* Add margin top and center buttons, allow wrapping */}
        {/* Large button linking to the 0.12 anniversary page */}
        <Link href="/anniversaries/0.12" passHref>
          <Button size="lg" className="text-xl px-12 py-8 shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            0.12
          </Button>
        </Link>
      </div>
    </div>
  );
}

