
"use client"; // Calendar component and selection state require client component

import { useState, useEffect, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Gift, Star, Cake } from 'lucide-react';
import { format, setDate, setMonth } from 'date-fns';
import { es } from 'date-fns/locale';

interface SpecialDate {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  icon: React.ElementType;
}

const getCurrentYear = () => new Date().getFullYear();

const getDynamicSpecialDates = (): SpecialDate[] => {
  const year = getCurrentYear();
  const specialDates: SpecialDate[] = [];

  // 1. Monthly Anniversaries on the 19th
  for (let month = 0; month < 12; month++) {
    const date = setDate(setMonth(new Date(year, 0, 1), month), 19);
    if (date.getMonth() === month) {
        specialDates.push({
            date: format(date, 'yyyy-MM-dd'),
            title: "Aniversario Mensual",
            description: `¡Celebrando nuestro amor este mes en ${year}!`,
            icon: Star
        });
    }
  }

  // 2. Cumple de mi Emi on August 4th
  specialDates.push({
    date: `${year}-08-04`,
    title: "Cumple de mi Emi",
    description: `¡Feliz cumpleaños a mi persona especial, Emi, en ${year}!`,
    icon: Cake
  });

  // 3. Cumple de Mathi on February 28th
   const mathiBday = new Date(year, 1, 28); // Month is 0-indexed, so 1 is February
   specialDates.push({
     date: format(mathiBday, 'yyyy-MM-dd'),
     title: "Cumple de Mathi",
     description: `¡Celebrando a Mathi en su día especial en ${year}!`,
     icon: Gift
   });

  return specialDates;
};


export default function DatesPage() {
  const [date, setDateState] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<SpecialDate[]>([]);

  const allSpecialDates = useMemo(() => getDynamicSpecialDates(), []);

  const specialDaysModifier = useMemo(() => {
    return allSpecialDates.map(d => {
        const [year, month, day] = d.date.split('-').map(Number);
        return new Date(year, month - 1, day);
      });
  }, [allSpecialDates]);

  useEffect(() => {
    if (date) {
      const selectedDateStr = format(date, 'yyyy-MM-dd');
      const events = allSpecialDates.filter(event => {
          // We need to compare the month and day, ignoring the year for recurring events
          // For simplicity with current structure, we will match the exact date including year.
          // This means events are shown for the current year.
          // If you want truly recurring events regardless of year, the getDynamicSpecialDates
          // and this filtering logic would need to be adjusted.
          const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number);
          const eventDateObject = new Date(eventYear, eventMonth -1, eventDay);
          const eventDateFormatted = format(eventDateObject, 'yyyy-MM-dd');
          
          // For monthly anniversaries, we need to match month and day with the current year's date.
          // For birthdays, we also match month and day with the current year's date.
          const selectedMonth = date.getMonth() + 1; // 1-indexed
          const selectedDay = date.getDate();

          const eventParsedMonth = parseInt(event.date.substring(5,7), 10);
          const eventParsedDay = parseInt(event.date.substring(8,10), 10);


          if (event.title === "Aniversario Mensual") {
            return eventParsedDay === selectedDay; // Match only day for monthly
          }
          // For other events, match month and day
          return eventParsedMonth === selectedMonth && eventParsedDay === selectedDay;
      });
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
          <CardContent className="p-2 sm:p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDateState}
              className="rounded-md border bg-card"
              locale={es}
              modifiers={{
                special: (day) => {
                  const dayMonth = day.getMonth() + 1;
                  const dayDate = day.getDate();
                  return allSpecialDates.some(event => {
                    const [_, eventMonth, eventDay] = event.date.split('-').map(Number);
                    if (event.title === "Aniversario Mensual") {
                      return eventDay === dayDate;
                    }
                    return eventMonth === dayMonth && eventDay === dayDate;
                  });
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
