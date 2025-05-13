
"use client"; // Calendar component and selection state require client component

import type { SpecialDate } from '@/types/dates'; // Import the type
import { useState, useEffect, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Star } from 'lucide-react'; // Adjusted icons
import { format, setDate, setMonth, getDate, getMonth, getYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { getSpecialDatesForYear } from '@/lib/dates'; // Import the utility function


export default function DatesPage() {
  const [date, setDateState] = useState<Date | undefined>(undefined);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [initialMonth, setInitialMonth] = useState<Date | undefined>(undefined);
  const [selectedEvents, setSelectedEvents] = useState<SpecialDate[]>([]);

  // Initialize date-dependent states on client-side after hydration
  useEffect(() => {
    const today = new Date();
    setDateState(today);
    setCurrentYear(getYear(today));
    setInitialMonth(today);
  }, []);

  // Memoize the generation of special dates for the current year
  const allSpecialDatesForYear = useMemo(() => {
    if (currentYear === null) return [];
    return getSpecialDatesForYear(currentYear);
  }, [currentYear]);

  // Memoize the modifier function for highlighting days
  const specialDaysModifier = useMemo(() => {
    if (currentYear === null) return [];
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
    if (date && currentYear !== null) {
      const selectedDay = getDate(date);
      const selectedMonth = getMonth(date) + 1; // 1-indexed month
      const selectedYear = getYear(date);
      let events: SpecialDate[] = [];

      // 1. Check for Monthly Anniversary on the 19th
      if (selectedDay === 19) {
        // Check if an anniversary for this specific date already exists to avoid duplicates
        const existingAnniversary = allSpecialDatesForYear.find(event => {
            const [_, eventMonth, eventDay] = event.date.split('-').map(Number);
            return event.title === "Aniversario Mensual" && eventMonth === selectedMonth && eventDay === selectedDay && getYear(new Date(event.date)) === selectedYear;
        });
        if (!existingAnniversary) {
            events.push({
              date: format(date, 'yyyy-MM-dd'),
              title: "Aniversario Mensual",
              description: `¡Celebrando nuestro amor este mes en ${selectedYear}!`,
              icon: Star,
            });
        }
      }

      // 2. Check for other specific dates (birthdays) matching selected month and day
      const specificEvents = allSpecialDatesForYear.filter(event => {
        const [_, eventMonth, eventDay] = event.date.split('-').map(Number);
        // For recurring events like birthdays, we only care about month and day match.
        // The year in event.date is for the event's specific instance, but we match for any year.
        return eventMonth === selectedMonth && eventDay === selectedDay;
      });
      
      // Filter out monthly anniversary from specificEvents if it was already added (to prevent double title)
      const filteredSpecificEvents = specificEvents.filter(event => !(selectedDay === 19 && event.title === "Aniversario Mensual"));
      
      events = [...events, ...filteredSpecificEvents];
      
      // Deduplicate events by title and date to be absolutely sure
      const uniqueEventsMap = new Map<string, SpecialDate>();
      events.forEach(event => {
        const key = `${event.title}-${event.date}`;
        if (!uniqueEventsMap.has(key)) {
          uniqueEventsMap.set(key, event);
        }
      });
      setSelectedEvents(Array.from(uniqueEventsMap.values()));

    } else {
      setSelectedEvents([]);
    }
  }, [date, allSpecialDatesForYear, currentYear]); // Dependency on date and the yearly dates

  // Render a loading state or minimal content until client-side states are ready
  if (currentYear === null || date === undefined || initialMonth === undefined) {
    return (
      <div className="space-y-8 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <header className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
                <CalendarDays className="w-8 h-8" />
                Nuestro Calendario Especial
            </h1>
            <p className="text-lg text-muted-foreground">Cargando fechas importantes...</p>
        </header>
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full max-w-4xl">
            <Card className="shadow-lg w-full lg:max-w-md">
                <CardContent className="p-2 sm:p-4 flex justify-center items-center min-h-[300px]">
                    <p className="text-muted-foreground">Cargando calendario...</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg w-full lg:max-w-md flex-grow">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">
                        Selecciona una Fecha
                    </CardTitle>
                    <CardDescription>
                        Cargando eventos...
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 min-h-[150px]">
                    <p className="text-muted-foreground italic pt-4">
                        Cargando eventos especiales...
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }


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
              month={initialMonth}
              onMonthChange={setInitialMonth}
              className="rounded-md border bg-card"
              locale={es}
              modifiers={{
                 special: (day) => {
                    const dayMonth = getMonth(day) + 1;
                    const dayDate = getDate(day);

                    if (dayDate === 19) return true;

                    return specialDaysModifier.some(specialDate =>
                         getMonth(specialDate) + 1 === dayMonth && getDate(specialDate) === dayDate
                    );
                 }
              }}
              modifiersClassNames={{
                special: 'bg-accent text-accent-foreground rounded-full font-bold'
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
          <CardContent className="space-y-4 min-h-[150px]"> {/* Added min-height */}
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <div key={`${event.title}-${event.date}-${index}`} className="flex items-start p-3 bg-secondary/30 rounded-lg shadow-sm">
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

