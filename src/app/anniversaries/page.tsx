
import Link from 'next/link'; // Import Link for navigation
import { Button } from '@/components/ui/button'; // Import Button component
import { Gift } from 'lucide-react';

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

      <div className="mt-12 flex justify-center"> {/* Add margin top and center button */}
        {/* Large button linking to homepage (replace href later if needed) */}
        <Link href="/" passHref>
          <Button size="lg" className="text-xl px-12 py-8 shadow-lg transform hover:scale-105 transition-transform duration-300"> {/* Make button large */}
            0.12
          </Button>
        </Link>
      </div>
    </div>
  );
}
