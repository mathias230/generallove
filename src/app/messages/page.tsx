import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Quote } from 'lucide-react';

const messages = [
  { id: 1, title: "Una Nota de Amor", content: "Cada día contigo se siente como un hermoso sueño del que nunca quiero despertar. Tu amor es mi mayor tesoro.", author: "Tu Amor", date: "Ahora Mismo" },
  { id: 2, title: "Pensando en Ti", content: "Solo quería enviarte un pequeño recordatorio de cuánto significas para mí. Iluminas mi mundo de maneras que no puedes imaginar.", author: "Yo", date: "Ayer" },
  { id: 3, title: "Mi Todo", content: "Eres mi roca, mi inspiración y mi mejor amigo/a. Gracias por ser tú, y por ser mío/a.", author: "Siempre Tuyo/a", date: "La Semana Pasada" },
  { id: 4, title: "Palabras Dulces", content: "Susurrando palabras dulces y compartiendo sonrisas secretas - estos son los hilos que tejen nuestra historia de amor.", author: "Con Adoración", date: "Hace un Tiempo" },
];

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <MessageSquare className="w-8 h-8" />
            Palabras del Corazón
        </h1>
        <p className="text-lg text-muted-foreground">Mensajes que hacen eco de nuestro amor y afecto.</p>
      </header>

      <div className="space-y-6 max-w-2xl mx-auto">
        {messages.map((message) => (
          <Card key={message.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Quote className="w-6 h-6 transform -scale-x-100" />
                    {message.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">De: {message.author} | {message.date}</CardDescription>
                </div>
                <Quote className="w-8 h-8 text-accent opacity-50" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground leading-relaxed">{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
