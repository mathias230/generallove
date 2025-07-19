
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Gift, Heart, Sparkles } from 'lucide-react';

export default function AnniversaryOnePointOnePage() {
  return (
    <div className="space-y-10 flex flex-col items-center p-4 md:p-8">
      <header className="text-center w-full max-w-3xl">
        <div className="flex items-center justify-center mb-4">
            <Gift className="w-12 h-12 text-primary mr-3 animate-pulse" />
            <h1 className="text-5xl font-bold text-primary">
                ¡Feliz Aniversario 1.1!
            </h1>
            <Sparkles className="w-10 h-10 text-secondary ml-3 animate-ping" />
        </div>
        <p className="text-xl text-muted-foreground">
          Celebrando un nuevo capítulo juntos.
        </p>
      </header>

      <Card className="w-full max-w-3xl shadow-2xl overflow-hidden bg-card/80 backdrop-blur-sm">
        <CardHeader className="p-0 relative">
          <Image
            src="https://picsum.photos/seed/aniversario101/1200/600"
            alt="Celebración de Aniversario 1.1"
            width={1200}
            height={600}
            className="w-full h-72 object-cover"
            data-ai-hint="pareja feliz"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <CardTitle className="text-4xl font-bold text-primary-foreground drop-shadow-lg">
              Un Nuevo Comienzo
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            Mi amor, ha pasado un año y un mes. Cada día a tu lado es una nueva página en nuestra historia. Estoy emocionado por todo lo que hemos vivido y todo lo que nos queda por delante. Sigamos construyendo este amor tan bonito que tenemos. ¡Por muchos más meses y años juntos! Te amo infinitamente.
          </p>
        </CardContent>
      </Card>

      <Link href="/anniversaries" passHref>
        <Button variant="outline" size="lg" className="shadow-md hover:bg-accent hover:text-accent-foreground">
          <ArrowLeft className="mr-2 h-5 w-5" /> Volver a Aniversarios
        </Button>
      </Link>
    </div>
  );
}
