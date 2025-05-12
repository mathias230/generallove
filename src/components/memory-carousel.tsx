"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Memory {
  id: number;
  title: string;
  message: string;
  image: string;
  date: string;
  imageHint: string;
}

const memories: Memory[] = [
  { id: 1, title: "Nuestra Primera Cita", message: "¿Recuerdas ese pequeño café? Se sintió como magia desde el principio. El ambiente acogedor, el aroma del café y tus ojos brillantes al otro lado de la mesa lo hicieron inolvidable.", image: "https://picsum.photos/600/400?random=1", date: "2022-03-15", imageHint: "pareja cafe" },
  { id: 2, title: "Abrazos de Noche de Película", message: "Envueltos en una manta suave, compartiendo palomitas y risas interminables durante nuestra película favorita. Esos momentos simples son pura felicidad.", image: "https://picsum.photos/600/400?random=2", date: "2022-07-20", imageHint: "pareja viendo pelicula" },
  { id: 3, title: "Ese Viaje Sorpresa", message: "Despertar con una maleta hecha y una aventura esperando. La emoción de lo desconocido y compartirlo contigo fue estimulante. ¡Siempre sabes cómo hacer la vida emocionante!", image: "https://picsum.photos/600/400?random=3", date: "2023-01-05", imageHint: "pareja viaje" },
  { id: 4, title: "Charlas Nocturnas", message: "Compartiendo sueños, miedos y pensamientos tontos bajo un manto de estrellas. Esas conversaciones profundas nos conectan a un nivel que las palabras no pueden describir completamente.", image: "https://picsum.photos/600/400?random=4", date: "Continuo", imageHint: "pareja noche" },
  { id: 5, title: "Aventuras Culinarias", message: "Narices empolvadas de harina y una cocina llena de risas (¡y a veces humo!). Cada comida que hacemos juntos es una obra maestra de amor.", image: "https://picsum.photos/600/400?random=5", date: "Semanalmente", imageHint: "pareja cocinando" },
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
      <Card className="w-full shadow-xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 bg-card">
        <CardHeader className="p-0 relative">
          {currentMemory.image && (
            <Image
              src={currentMemory.image}
              alt={currentMemory.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover"
              data-ai-hint={currentMemory.imageHint}
              priority={currentIndex === 0} // Prioritize loading the first image
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <CardTitle className="text-3xl font-bold text-primary-foreground drop-shadow-md">{currentMemory.title}</CardTitle>
            <CardDescription className="text-sm text-primary-foreground/80 mt-1">{currentMemory.date}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg text-foreground leading-relaxed">{currentMemory.message}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-6 bg-muted/50">
           <div className="flex items-center text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
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
