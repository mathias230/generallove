
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

// Sample anniversary data (can be expanded)
const anniversaries = [
  { id: 1, title: "Primer Aniversario Mensual", date: "2024-06-19", description: "Nuestro primer mes juntos, ¡el comienzo de algo hermoso!" },
  { id: 2, title: "Segundo Aniversario Mensual", date: "2024-07-19", description: "Dos meses de risas, amor y crecimiento." },
  // Add more anniversaries here
];

export default function AnniversariesPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <Gift className="w-8 h-8" />
            Nuestros Aniversarios
        </h1>
        <p className="text-lg text-muted-foreground">Celebrando los hitos de nuestro amor.</p>
      </header>

      <div className="space-y-6 max-w-3xl mx-auto">
        {anniversaries.length > 0 ? (
          anniversaries.map((anniversary) => (
            <Card key={anniversary.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{anniversary.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{anniversary.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-foreground leading-relaxed">{anniversary.description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground italic">
                Aún no hay aniversarios registrados. ¡Esperando crear muchos más recuerdos!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
