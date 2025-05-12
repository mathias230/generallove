
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Gift, Heart, Sparkles } from 'lucide-react';

export default function AnniversaryZeroPointTwelvePage() {
  return (
    <div className="space-y-10 flex flex-col items-center p-4 md:p-8">
      <header className="text-center w-full max-w-3xl">
        <div className="flex items-center justify-center mb-4">
            <Gift className="w-12 h-12 text-primary mr-3 animate-pulse" />
            <h1 className="text-5xl font-bold text-primary">
                ¡Feliz Aniversario 0.12!
            </h1>
            <Sparkles className="w-10 h-10 text-secondary ml-3 animate-ping" />
        </div>
        <p className="text-xl text-muted-foreground">
          Celebrando un hito más en nuestra hermosa historia de amor.
        </p>
      </header>

      <Card className="w-full max-w-3xl shadow-2xl overflow-hidden bg-card/80 backdrop-blur-sm">
        <CardHeader className="p-0 relative">
          <Image
            src="https://picsum.photos/seed/aniversario012/1200/600"
            alt="Celebración de Aniversario 0.12"
            width={1200}
            height={600}
            className="w-full h-72 object-cover"
            data-ai-hint="celebracion pareja"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <CardTitle className="text-4xl font-bold text-primary-foreground drop-shadow-lg">
              Un Día Especial Para Recordar
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <CardDescription className="text-lg text-foreground leading-relaxed">
            Mi amor, parece que fue ayer cuando empezamos esta aventura, y mira cuánto hemos crecido juntos.
            Este aniversario 0.12, aunque pueda parecer un número peculiar, simboliza cada pequeño gran momento que hemos compartido.
            Es un recordatorio de que nuestro amor se construye día a día, con risas, complicidad y ese cariño que solo nosotros entendemos.
          </CardDescription>

          <div className="p-6 bg-secondary/30 rounded-lg shadow-inner">
            <h3 className="text-2xl font-semibold text-secondary-foreground mb-3 flex items-center">
              <Heart className="w-6 h-6 mr-2 fill-current text-pink-500" />
              Lo que Amo de Nosotros:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-md">
              <li>Tu sonrisa que ilumina mis días.</li>
              <li>Cómo nos apoyamos incondicionalmente.</li>
              <li>Las aventuras que hemos vivido y las que nos esperan.</li>
              <li>Esos pequeños detalles que hacen nuestro amor único.</li>
            </ul>
          </div>

          <p className="text-lg text-foreground leading-relaxed">
            Gracias por ser mi compañero/a, mi confidente y mi gran amor. Por muchos más momentos, risas y aniversarios juntos.
            ¡Te amo más de lo que las palabras pueden expresar!
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
