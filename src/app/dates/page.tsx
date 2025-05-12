
"use client"; // Calendar component and selection state require client component

import { useState, useEffect, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Gift, Star, Cake } from 'lucide-react'; // Added Cake icon
import { format, setDate, setMonth } from 'date-fns'; // Added setDate, setMonth
import { es } from 'date-fns/locale'; // Import Spanish locale

interface SpecialDate {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  icon: React.ElementType;
}

// Helper to get current year for dynamic dates
const getCurrentYear = () => new Date().getFullYear();

// Updated function to generate the new set of special dates
const getDynamicSpecialDates = (): SpecialDate[] => {
  const year = getCurrentYear();
  const specialDates: SpecialDate[] = [];

  // 1. Monthly Anniversaries on the 19th
  for (let month = 0; month < 12; month++) {
    // Ensure date exists (handles Feb 29 edge case implicitly)
    const date = setDate(setMonth(new Date(year, 0, 1), month), 19);
    if (date.getMonth() === month) { // Check if setting the date didn't roll over the month
        specialDates.push({
            date: format(date, 'yyyy-MM-dd'), // Format as YYYY-MM-DD
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
    icon: Cake // Using Cake icon for birthdays
  });

  // 3. Cumple de Mathi on February 28th
  // Check for leap year for Feb 29, but requirement is Feb 28
   const mathiBday = new Date(year, 1, 28); // Month is 0-indexed, so 1 is February
   specialDates.push({
     date: format(mathiBday, 'yyyy-MM-dd'),
     title: "Cumple de Mathi",
     description: `¡Celebrando a Mathi en su día especial en ${year}!`,
     icon: Gift // Using Gift icon for Mathi's birthday
   });


  // Ensure date format is YYYY-MM-DD for consistency - handled by format() above
  return specialDates;
};


export default function DatesPage() {
  const [date, setDateState] = useState<Date | undefined>(new Date()); // Renamed setDate to avoid conflict
  const [selectedEvents, setSelectedEvents] = useState<SpecialDate[]>([]);

  // Use useMemo to calculate special dates only once
  const allSpecialDates = useMemo(() => getDynamicSpecialDates(), []);

  // Memoize the calculation of date objects for the calendar modifier
  const specialDaysModifier = useMemo(() => {
    return allSpecialDates.map(d => {
        // Parse YYYY-MM-DD string correctly into a local Date object
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
         // Only compare day and month for recurring events, or full date for specific year events
         // Let's filter based on the exact date string match for simplicity with current data structure
          const eventDateStr = format(new Date(eventYear, eventMonth - 1, eventDay), 'yyyy-MM-dd');
          const selectedDateStr = format(date, 'yyyy-MM-dd');
          return eventDateStr === selectedDateStr;

         // Alternative for just month/day matching (would require changes to how dates are generated/stored)
         // return (eventMonth - 1) === selectedMonth && eventDay === selectedDay;
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
          <CardContent className="p-2 sm:p-4 flex justify-center"> {/* Added flex and justify-center */}
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDateState} // Use renamed state setter
              className="rounded-md border bg-card" // Removed w-full
              locale={es} // Set locale to Spanish
              modifiers={{
                special: specialDaysModifier
              }}
              modifiersClassNames={{
                special: 'bg-accent text-accent-foreground rounded-full font-bold' // Made special dates bold
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

