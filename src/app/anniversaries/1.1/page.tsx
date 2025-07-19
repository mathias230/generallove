
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
            Mi princesita mi bebita ha pasado exactamente 1 año y 1 mes desde que nos hicimos novios, una relacion mas entre millones, solo que con una diferencia en la propuesta, chiquita pero que hizo que cambiara todo y sea unica, en vez de "quieres ser mi novia?" un "puedo ser tu novio?" y creo que eso cambio todo JASDJASJ PERO ME ALEGRO MUCHO DE QUE HAYA SIDO ASI, sinceramente queria que fuera algo diferente contigo, ño queria que fuera parecido a lo que ya he tenido, queria que fuera super super diferente, y por eso TOY MUYYY AFORTUNADO DE TENERTE MI BEBITA CONSENTIDA, simplemente ño tengo palabras para explicar todito todito lo que siento por ti mi bebita consentida eres la mejor persona que he conocido, la persona mas bonita y hermosha que he conocido y visto, simplemente se que nunca nunca por mas gente que exista en el mundo, se que nunca nunca jamás en mi vida encontrare a alguien como tu, aprecio cada momento contigo mi bebita, ño sabes lo feli que soy contigo mi amor, solo por favor nunca nunca te vayas de mi vida mi princesita hermosha amo cada momento contigo, cada segundito cada minutito cada hora cada dia cada semana cada mes cada año, cada dia que despierto me pongo muy muy feli al recordar de que tu eres mi noviecita y yo soy tu noviecito, ME ENCANTAS TE AMO TE AMO ME ENCANTA ABSOLUTAMENTE TODOOOO DE TI TODITO TODITO Y TE QUIERO COMER A BETITOS A MUCHOS MUCHOS BETITOS QUIERO ASI ATACARTE A BETITOS MUA MUAAAAA ME HACES TAN FELI COMO ÑO TIENES IDEA MI BEBITA CONSENTIDA ADORO CADA MOMENTO JUNTO A TI Y LOS VALORO COMO ÑO TIENES IDEA MI BEBITA CONSENTIDA, NUNCA TE VAYAS DE MI VIDA POQUE CHI TU TE VAS SE VA MI VIDA, porque tu eres mi vida, ya ño solo eres parte de mi vida, eres mi vida completa, eres mi mundo completo eres mi vida eres magnifica, jamás jamás te compares con nadie ni pienses que ño eres suficiente mi amor, eres mas que suficiente y lo sabes mi bebita consentida, me haces sentir como la persona mas importante en el mundo y aprecio eso con mi vida y alma  entera mi amor, simplemente ño existen las palabras suficientes en el mundo para describir y explicar todo lo que siento por ti, ni aunque las hubieran, ño tendría la capacidad mental de ordenarlas para explicar todo lo bonito que siento por ti y lo muy enamorado que estoy de ti, hoy te vuelvo a escribir un nuevo párrafo gigante para demostrarte mi amor, eres increíble, se que te he dicho lo mismo un millón de veces pero es que de verdad eres increíble mi amor, eres hermosha eres perfecta eres LO QUE SIEMPRE QUISE EN MI VIDA MUAAAA MI BEBITA HERMOSHAAA NUNCA TE VAYAS DE MI VIDA, FELICES 1 AÑO Y 1 MES MI AMOR FELIZ 1.1 TE AMO Y TE ADORO DEMASIADO MI PRINCESITA HERMOSHAAAAAAA
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
