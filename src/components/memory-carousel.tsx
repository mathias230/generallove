"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles, EyeOff } from 'lucide-react'; // Added EyeOff icon
import { cn } from '@/lib/utils';

interface Memory {
  id: number;
  title: string;
  message: string;
  image: string;
  date: string;
  imageHint: string;
  censored?: boolean; // Added censored flag
}

// Define the first real memory
const firstMemory: Memory = {
  id: 1,
  title: "Nuestra Primera Cita",
  message: "¿Recuerdas ese pequeño café? Se sintió como magia desde el principio. El ambiente acogedor, el aroma del café y tus ojos brillantes al otro lado de la mesa lo hicieron inolvidable.",
  image: "https://picsum.photos/seed/cita1/600/400", // Updated seed for potentially different image
  date: "2022-03-15",
  imageHint: "pareja cafe",
};

// Define a placeholder for censored memories
const censoredMemoryPlaceholder = (id: number): Memory => ({
  id: id,
  title: "Recuerdo Bloqueado",
  message: "Este recuerdo se está preparando. ¡Vuelve pronto para descubrirlo!",
  image: "https://picsum.photos/seed/censored/600/400", // Generic placeholder image
  date: "Próximamente",
  imageHint: "bloqueado abstracto", // Hint for placeholder
  censored: true,
});

// Create the full list of memories
const memories: Memory[] = [
  firstMemory,
  censoredMemoryPlaceholder(2),
  censoredMemoryPlaceholder(3),
  censoredMemoryPlaceholder(4),
  censoredMemoryPlaceholder(5),
];

export default function MemoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? memories.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === memories.length - 1 ? 0 : prevIndex + 1));
  };

  const currentMemory = memories[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-6">
      <Card className={cn(
        "w-full shadow-xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 bg-card",
        currentMemory.censored && "opacity-70" // Add opacity if censored
      )}>
        <CardHeader className="p-0 relative">
          {currentMemory.image && (
            <Image
              src={currentMemory.image}
              alt={currentMemory.title}
              width={600}
              height={400}
              className={cn("w-full h-64 object-cover", currentMemory.censored && "filter blur-sm grayscale")} // Apply blur and grayscale if censored
              data-ai-hint={currentMemory.imageHint}
              priority={currentIndex === 0} // Prioritize loading the first image
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
           <div className="absolute bottom-0 left-0 p-6 flex items-center gap-2">
             {currentMemory.censored && <EyeOff className="w-8 h-8 text-primary-foreground/80 drop-shadow-md" />}
             <div>
                <CardTitle className="text-3xl font-bold text-primary-foreground drop-shadow-md">{currentMemory.title}</CardTitle>
                <CardDescription className="text-sm text-primary-foreground/80 mt-1">{currentMemory.date}</CardDescription>
             </div>
           </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className={cn("text-lg text-foreground leading-relaxed", currentMemory.censored && "italic")}> {/* Add italic if censored */}
            {currentMemory.message}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-6 bg-muted/50">
           <div className="flex items-center text-sm text-muted-foreground">
             {currentMemory.censored ? (
                <EyeOff className="w-4 h-4 mr-2 text-muted-foreground" />
             ) : (
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
             )}
            <span>Recuerdo {currentIndex + 1} de {memories.length}</span>
          </div>
           <div className="text-sm text-muted-foreground">
             Desliza para ver más
           </div>
        </CardFooter>
      </Card>

      <div className="flex space-x-4">
        <Button onClick={handlePrevious} variant="outline" size="lg" className="shadow-md hover:bg-accent hover:text-accent-foreground">
          <ChevronLeft className="mr-2 h-5 w-5" /> Anterior
        </Button>
        <Button onClick={handleNext} variant="outline" size="lg" className="shadow-md hover:bg-accent hover:text-accent-foreground">
          Siguiente <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {memories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir al recuerdo ${index + 1}`}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentIndex === index ? "bg-primary scale-125" : "bg-muted hover:bg-primary/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
