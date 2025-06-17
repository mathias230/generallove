
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Gift, Heart, Sparkles, Music2 } from 'lucide-react';

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
          Hasta lo imposible es posible
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
          <div className="text-lg text-foreground leading-relaxed">
            Mi amor, parece que fue ayer cuando todo esto empezo, esta bonita aventura, mira cuanto hemos crecido y aprendido juntos, tuvimos errores como cualquier persona pero lo valioso fue la perseverancia y el haber podido aprender de los errores, probablemente nadie creyo en nosotros, en que pasariamos de al menos los 3 meses, y nosotros tampoco creimos la verdad, pero eso nos hizo mas especiales y nos hace, esto demostro nuestra valentia y fuerza, pudimos ir contra viento y marea, nada ni nadie nos separo hasta ahora, ni la distancia, y creeme que nada lo hara, felices 12 meses, FELIZ 1 AÑOOO MI BEBITAAAA, TE AMOOO MUCHO Y TE ADORO DEMASIADO MI NIÑA BONITAAA
          </div>

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
            Gracias por ser mi compañera, mi novia y mi gran amor, estoy muy orgulloso de todo lo que te he visto lograr, yo siempre confie en ti desde el dia 1, y siempre confiare en ti hasta el infinito y mas alla, disfrutemos de este hermoso dia sin problemas mi amor, disfrutemos porque ño siempre se cumple 1 año, TE AMO Y TE ADORO DEMASIADO MI AMORRRR
          </p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary flex items-center">
            <Music2 className="w-8 h-8 mr-3 text-primary" />
            Letras de Nuestras Canciones
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Un espacio para esas melodías que cuentan nuestra historia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold text-secondary-foreground mb-2">Nombre de la Canción 1</h4>
            <pre className="text-sm text-foreground whitespace-pre-wrap bg-muted/50 p-4 rounded-md shadow-inner font-mono">
              Aquí iría la letra de la canción...
              Puedes copiar y pegar desde Spotify o donde la tengas.
              Asegúrate de que el formato sea legible.
            </pre>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-secondary-foreground mb-2">Nombre de la Canción 2</h4>
            <pre className="text-sm text-foreground whitespace-pre-wrap bg-muted/50 p-4 rounded-md shadow-inner font-mono">
              Letra de otra canción especial...
              Cada línea es un nuevo verso.
            </pre>
          </div>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">
                Puedes añadir más canciones editando este componente.
            </p>
        </CardFooter>
      </Card>


      <Link href="/anniversaries" passHref>
        <Button variant="outline" size="lg" className="shadow-md hover:bg-accent hover:text-accent-foreground">
          <ArrowLeft className="mr-2 h-5 w-5" /> Volver a Aniversarios
        </Button>
      </Link>
    </div>
  );
}
