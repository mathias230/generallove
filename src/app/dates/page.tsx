
"use client"; // Calendar component and selection state require client component

import type { SpecialDate } from '@/types/dates'; // Import the type
import { useState, useEffect, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Star, Cake, Gift } from 'lucide-react'; // Adjusted icons
import { format, setDate, setMonth, getDate, getMonth, getYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { getSpecialDatesForYear } from '@/lib/dates'; // Import the utility function


export default function DatesPage() {
  const [date, setDateState] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<SpecialDate[]>([]);
  const currentYear = useMemo(() => getYear(new Date()), []);

  // Memoize the generation of special dates for the current year
  const allSpecialDatesForYear = useMemo(() => getSpecialDatesForYear(currentYear), [currentYear]);

  // Memoize the modifier function for highlighting days
  const specialDaysModifier = useMemo(() => {
    // Extract unique day/month combinations for highlighting
    const highlightDates = new Map<string, Date>();

    allSpecialDatesForYear.forEach(event => {
        const [_, month, day] = event.date.split('-').map(Number);
        const key = `${month}-${day}`;
        if (!highlightDates.has(key)) {
             // Store a representative date (using current year for simplicity in Date object creation)
             // The actual check in the modifier will only use month and day
             highlightDates.set(key, new Date(currentYear, month - 1, day));
        }
    });

    // Add the 19th of every month for the anniversary highlight
    for (let month = 0; month < 12; month++) {
        const key = `${month + 1}-19`;
         if (!highlightDates.has(key)) {
             highlightDates.set(key, new Date(currentYear, month, 19));
         }
    }


    return Array.from(highlightDates.values());

  }, [allSpecialDatesForYear, currentYear]);


  // Effect to update displayed events when the selected date changes
  useEffect(() => {
    if (date) {
      const selectedDay = getDate(date);
      const selectedMonth = getMonth(date) + 1; // 1-indexed month
      const selectedYear = getYear(date);
      let events: SpecialDate[] = [];

      // 1. Check for Monthly Anniversary on the 19th
      if (selectedDay === 19) {
        events.push({
          // Generate a specific event object for the selected date
          date: format(date, 'yyyy-MM-dd'),
          title: "Aniversario Mensual",
          description: `¡Celebrando nuestro amor este mes en ${selectedYear}!`,
          icon: Star,
        });
      }

      // 2. Check for other specific dates (birthdays) matching selected month and day
      const specificEvents = allSpecialDatesForYear.filter(event => {
        // Skip the generic "Aniversario Mensual" template if it exists in the source array
        // (We handle the anniversary display based on the selected day being 19)
        if (event.title === "Aniversario Mensual") return false;

        const [_, eventMonth, eventDay] = event.date.split('-').map(Number);
        return eventMonth === selectedMonth && eventDay === selectedDay;
      });

      // Add the found specific events
      events = [...events, ...specificEvents];

      setSelectedEvents(events);

    } else {
      setSelectedEvents([]);
    }
  }, [date, allSpecialDatesForYear]); // Dependency on date and the yearly dates

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
          <CardContent className="p-2 sm:p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDateState}
              className="rounded-md border bg-card"
              locale={es}
              modifiers={{
                 // Use the pre-calculated array of dates to highlight
                 special: (day) => {
                    const dayMonth = getMonth(day) + 1;
                    const dayDate = getDate(day);

                    // Highlight the 19th specifically
                    if (dayDate === 19) return true;

                    // Highlight other specific dates from our memoized list
                    return specialDaysModifier.some(specialDate =>
                         getMonth(specialDate) + 1 === dayMonth && getDate(specialDate) === dayDate
                    );
                 }
              }}
              modifiersClassNames={{
                special: 'bg-accent text-accent-foreground rounded-full font-bold'
              }}
              // Show the full month, disable navigation to other months initially if desired
              // Or allow navigation but ensure `getSpecialDatesForYear` is called if year changes
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
          <CardContent className="space-y-4 min-h-[150px]"> {/* Added min-height */}
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <div key={index} className="flex items-start p-3 bg-secondary/30 rounded-lg shadow-sm">
                  <event.icon className="w-6 h-6 mr-3 text-secondary-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic pt-4">
                {date ? "¿Ninguna ocasión especial marcada? Quizás sea perfecto para crear una nueva memoria." : "Haz clic en una fecha en el calendario para ver los detalles."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

