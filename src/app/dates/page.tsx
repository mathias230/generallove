
"use client"; // Calendar component and selection state require client component

import { useState, useEffect, useMemo } from 'react';
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

// Keep this outside the component if it doesn't rely on component props/state
const getDynamicSpecialDates = (): SpecialDate[] => {
  const year = getCurrentYear();
  return [
    { date: `${year}-03-15`, title: "Aniversario Primera Cita", description: `¡Celebrando el día que comenzó nuestro viaje en ${year}!`, icon: Star },
    { date: `${year}-08-22`, title: "Cumpleaños de mi Amor", description: `¡Un día especial para mi persona especial en ${year}!`, icon: Gift },
    { date: `${year}-12-25`, title: "Navidad Juntos", description: `Fiestas acogedoras y cálidos recuerdos en ${year}.`, icon: Gift },
    { date: `${year+1}-01-01`, title: "Día de Año Nuevo", description: "¡Primer día de un nuevo año juntos!", icon: Star },
    // Ensure date format is YYYY-MM-DD for consistency
  ];
};


export default function DatesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<SpecialDate[]>([]);

  // Use useMemo to calculate special dates only once
  const allSpecialDates = useMemo(() => getDynamicSpecialDates(), []);

  // Memoize the calculation of date objects for the calendar modifier
  const specialDaysModifier = useMemo(() => {
    return allSpecialDates.map(d => {
        // Parse YYYY-MM-DD string correctly into a local Date object
        // The calendar typically works with local dates
        const [year, month, day] = d.date.split('-').map(Number);
        // Month is 0-indexed in Date constructor
        return new Date(year, month - 1, day);
      });
  }, [allSpecialDates]);

  useEffect(() => {
    if (date) {
      // Get year, month (0-indexed), day from the selected date (local)
      const selectedYear = date.getFullYear();
      const selectedMonth = date.getMonth();
      const selectedDay = date.getDate();

      // Filter events by comparing date parts to avoid timezone issues
      const events = allSpecialDates.filter(event => {
         // Parse event date string (YYYY-MM-DD)
         const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number);
         // Compare parts (month is 1-based in string, needs to be 0-based for comparison)
         return eventYear === selectedYear && (eventMonth - 1) === selectedMonth && eventDay === selectedDay;
      });
      setSelectedEvents(events);
    } else {
      setSelectedEvents([]);
    }
  }, [date, allSpecialDates]); // Re-run effect when date or the list of special dates changes

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
                // Use the memoized modifier calculation
                special: specialDaysModifier
              }}
              modifiersClassNames={{
                special: 'bg-accent text-accent-foreground rounded-full'
              }}
              // fixedWeeks // Uncomment if height jumps on month change are an issue
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg w-full lg:max-w-md flex-grow">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              {/* Format date using date-fns, respecting locale */}
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

