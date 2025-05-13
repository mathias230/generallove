
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Gift, Heart, Sparkles } from 'lucide-react';

export default function AnniversaryZeroPointElevenPage() {
  return (
    <div className="space-y-10 flex flex-col items-center p-4 md:p-8">
      <header className="text-center w-full max-w-3xl">
        <div className="flex items-center justify-center mb-4">
            <Gift className="w-12 h-12 text-primary mr-3 animate-pulse" />
            <h1 className="text-5xl font-bold text-primary">
                ¡Feliz Aniversario 0.11!
            </h1>
            <Sparkles className="w-10 h-10 text-secondary ml-3 animate-ping" />
        </div>
        <p className="text-xl text-muted-foreground">
          Celebrando otro mes mágico en nuestra hermosa historia de amor.
        </p>
      </header>

      <Card className="w-full max-w-3xl shadow-2xl overflow-hidden bg-card/80 backdrop-blur-sm">
        <CardHeader className="p-0 relative">
          <Image
            src="https://picsum.photos/seed/aniversario011/1200/600"
            alt="Celebración de Aniversario 0.11"
            width={1200}
            height={600}
            className="w-full h-72 object-cover"
            data-ai-hint="amor celebracion"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <CardTitle className="text-4xl font-bold text-primary-foreground drop-shadow-lg">
              Otro Mes de Amor Inolvidable
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <CardDescription className="text-lg text-foreground leading-relaxed">
            Amor mío, cada día a tu lado es un regalo. Este aniversario 0.11 es un pequeño gran paso en nuestro viaje,
            lleno de momentos que atesoro en mi corazón. Parece que fue ayer cuando todo comenzó,
            y hoy nuestro amor sigue floreciendo, más fuerte y hermoso que nunca.
          </CardDescription>

          <div className="p-6 bg-secondary/30 rounded-lg shadow-inner">
            <h3 className="text-2xl font-semibold text-secondary-foreground mb-3 flex items-center">
              <Heart className="w-6 h-6 mr-2 fill-current text-pink-500" />
              Momentos Especiales de Este Mes:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-md">
              <li>Nuestras conversaciones nocturnas llenas de sueños.</li>
              <li>La forma en que nos hacemos reír sin parar.</li>
              <li>El apoyo constante que nos damos mutuamente.</li>
              <li>Cada aventura, grande o pequeña, que compartimos.</li>
            </ul>
          </div>

          <p className="text-lg text-foreground leading-relaxed">
            Gracias por tu amor, tu paciencia y por ser la persona maravillosa que eres.
            Estoy emocionada/o por todo lo que nos depara el futuro. ¡Te amo con todo mi ser!
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
