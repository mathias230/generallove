
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Gift, Heart, Sparkles } from 'lucide-react';

export default function AnniversaryOnePointTwoPage() {
  return (
    <div className="space-y-10 flex flex-col items-center p-4 md:p-8">
      <header className="text-center w-full max-w-3xl">
        <div className="flex items-center justify-center mb-4">
            <Gift className="w-12 h-12 text-primary mr-3 animate-pulse" />
            <h1 className="text-5xl font-bold text-primary">
                ¡Feliz Aniversario 1.2!
            </h1>
            <Sparkles className="w-10 h-10 text-secondary ml-3 animate-ping" />
        </div>
        <p className="text-xl text-muted-foreground">
          Un mes más en nuestra increíble historia.
        </p>
      </header>

      <Card className="w-full max-w-3xl shadow-2xl overflow-hidden bg-card/80 backdrop-blur-sm">
        <CardHeader className="p-0 relative">
          <Image
            src="https://picsum.photos/seed/aniversario102/1200/600"
            alt="Celebración de Aniversario 1.2"
            width={1200}
            height={600}
            className="w-full h-72 object-cover"
            data-ai-hint="amor celebracion"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <CardTitle className="text-4xl font-bold text-primary-foreground drop-shadow-lg">
              Un paso mas
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            MI AMORRR FELICES 1.2 MESES CHIII TI AMUUU Y TE ADORO CON MI VIDA Y ALMA ENTERA, eres lo mejor mejor que me ha pasado en la vida y de verdad muchas muchas gracias por todito mi princesita hermosha, toy muy muy pero MUYYYY Feli de tenerte en mi vida, de tenerte a mi lado, aunque ño sea físicamente, igual lo disfruto mucho mi amor, eres esa persona perfecta, eres esa persona increíble que tanto tanto me hace sonreir, eres tu y quello que seas solo tu por el resto de mi vida, ño hay nada mas bonito que tenerte a ti en mi vida, que seas mi novia, poder llamarte "mi amor" o "mi bebita" o todos esos apodos tan bonitos que te digo mi princesita, eres mi reina eres mi princesita eres mi bebita consentida eres mi todo eres mi mundo eres mi sol mi luna mi TODO, eres mi oxigeno, quiero respirar solo de tu aire, quiero todo contigo una y otra vez, quiero todo en esta vida junto a ti, que se jodan las demás personas, el mundo exterior ño importa chi tu estas a mi lado, mientras tu estes junto a mi, las opiniones de fuera ño me importaran, para que hacerle caso a personas que ño saben nada, nosotros con tiempo esfuerzo y dedicación hemos demostrado que podemos con todo, con muchísimas cosas, ño por nada hasta tu y yo pensábamos que solo duraríamos 3 meses, pero se termino multiplicando, le demosmtramos a toditos, incluso a nosotros mismos, que aunque las cosas parezcan difíciles, mientras ambas personas se amen y esten dispuestas a darlo todo, Ño hay ABSOLUTAMENTE NADA NI NADIEEE Que pueda contra nosotros, porque somos 1 mi amor, desde el dia en el que te conocí me comencé a enamorar y me comencé a sentir parte de ti, respiro por ti, vivo por ti, disfruto por ti y sonrio por ti, eres mas que mil palabras, tu amor vale mas que miles de dólares, tu amor me enseño muchas cosas, tu me enseñaste muchas cosas, tu me cambiaste para bien, tu me devolviste esa luz que se había ido, tu me hiciste volver a vivir, en este año he vivido cosas increíbles, felices, tristes, y valoro cada uno de esos momentos, aunque algunos ño sean perfectos, valoro todos y cada uno de ellos como ño tienes idea mi bebita, eres esa personita que hizo todo por mi, que me hizo ser yo, que me hizo vivir de nuevo, que me hizo soñar y me devolvió esa esperanza que tanto me faltaba, hoy en otro aniversario mas, otro mes demostrando y amando, otro mes siendo nosotros, estoy aquí para darte otro parrafito emotivo, contando todos mi sentimientos y lo mucho que me haz ayudado, la verdad es que hemos llegado tan lejos que a veces simplemente me quedo sin ideas JAJAJ, y definitivamente es algo muy bueno, se que aun somos muy tiquitos comparado con la vida, aun nos falta mucho para crecer y conocer, pero creeme que mientras siga respirando, yo intentare siempre siempre seguir junto a ti, siempre seguir a tu lado y fijarme solo en ti mi amor, estar a tu ladito, estar abrazandote, dándote bechitos, haciéndote saber en persona que eres la mejor novia del mundo, la mejor persona, que eres perfecta, abrazandote mientras olvidamos el resto del mundo y nos volvemos uno, donde solo existimos tu y yo, con lo que sentimos, te debo todo mi amor, eres definitivamente la persona que me cambio completamente y llegaste en el momento perfecto mi bebita, se que al inicio tuvimos dudas, ño solo al inicio, también en medio de esto tuvimos dudas, que estuvimos a punto de acabar todo esto, pero yo siempre siempre insisti en que era un momento temporal y que todo cambiaria, a la final creo que chi tenia razón, aunque es muy pronto para decirlo, pero quiero pensar que chi vamos muy bien mi amor, porque la verdad e que chi vamos muyyy bien mi bebita, Somos humanos y esta bien a veces dudar o sentirse mal, pero en esos momentos es cuando mas nos necesitamos uno al otro mi amor, para apoyarnos y estar siempre acompañando y apoyando, tus sentimientos también son mis sentimientos mi amor, toy muy conectado a ti que daría todo por ti, tu felicidad vale mas que cualquier cosa enj esta vida, tu felicidad tu sonrisa tu emoción, todo, eres mi bebita consentida y ño quiero que nunca nunca cambie eso mi amor, jamás, por eso mientras yo siga viviendo, siempre habre alguien que te ame y te adore con todo su corazoncito incluso con su alma, e incluso después de la muerte, mi alma te amara hasta el infinito y mas allá. FELICES 1.2 MI AMOR MUAAA TI AMUUU Y TE ADORO DEMASIADO MI PRINCESITA HERMOSHAAA💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗
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
