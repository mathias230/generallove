"use client"; // Calendar component and selection state require client component

import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Gift, Star } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Import Spanish locale

interface SpecialDate {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  icon: React.ElementType;
}

// Helper to get current year for dynamic dates
const getCurrentYear = () => new Date().getFullYear();

const getDynamicSpecialDates = (): SpecialDate[] => {
  const year = getCurrentYear();
  return [
    { date: `${year}-03-15`, title: "Aniversario Primera Cita", description: `¡Celebrando el día que comenzó nuestro viaje en ${year}!`, icon: Star },
    { date: `${year}-08-22`, title: "Cumpleaños de mi Amor", description: `¡Un día especial para mi persona especial en ${year}!`, icon: Gift },
    { date: `${year}-12-25`, title: "Navidad Juntos", description: `Fiestas acogedoras y cálidos recuerdos en ${year}.`, icon: Gift },
    { date: `${year+1}-01-01`, title: "Día de Año Nuevo", description: "¡Primer día de un nuevo año juntos!", icon: Star },
  ];
};


export default function DatesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<SpecialDate[]>([]);
  const [allSpecialDates, setAllSpecialDates] = useState<SpecialDate[]>([]);

  useEffect(() => {
    setAllSpecialDates(getDynamicSpecialDates());
  }, []);

  useEffect(() => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const events = allSpecialDates.filter(event => event.date === formattedDate);
      setSelectedEvents(events);
    } else {
      setSelectedEvents([]);
    }
  }, [date, allSpecialDates]);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <CalendarDays className="w-8 h-8" />
            Nuestro Calendario Especial
        </h1>
        <p className="text-lg text-muted-foreground">Nunca te pierdas un momento importante para nosotros.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <Card className="shadow-lg w-full lg:max-w-md">
          <CardContent className="p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-card w-full"
              locale={es} // Set locale to Spanish
              modifiers={{
                special: allSpecialDates.map(d => new Date(d.date.replace(/-/g, '/'))) // Ensure correct date parsing
              }}
              modifiersClassNames={{
                special: 'bg-accent text-accent-foreground rounded-full'
              }}
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg w-full lg:max-w-md flex-grow">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              {date ? format(date, "PPP", { locale: es }) : "Selecciona una Fecha"}
            </CardTitle>
            <CardDescription>
              {selectedEvents.length > 0 ? "Esto es lo especial de hoy:" : "No hay eventos especiales para este día."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <div key={index} className="flex items-start p-3 bg-secondary/30 rounded-lg">
                  <event.icon className="w-6 h-6 mr-3 text-secondary-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic">
                {date ? "¿No hay ocasiones especiales marcadas para esta fecha? ¿Quizás planear algo encantador?" : "Haz clic en una fecha en el calendario para ver los detalles."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
