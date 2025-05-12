"use client"; // Calendar component and selection state require client component

import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Gift, Star } from 'lucide-react';
import { format } from 'date-fns';

interface SpecialDate {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  icon: React.ElementType;
}

const specialDates: SpecialDate[] = [
  { date: '2024-03-15', title: "Our First Date Anniversary", description: "Celebrating the day our journey began!", icon: Star },
  { date: '2024-08-22', title: "Partner's Birthday", description: "A special day for my special someone!", icon: Gift },
  { date: '2024-12-25', title: "Christmas Together", description: "Cozy holidays and warm memories.", icon: Gift },
  // Add more dates as needed, ensure year is current or relevant
];

// Helper to get current year for dynamic dates
const getCurrentYear = () => new Date().getFullYear();

const getDynamicSpecialDates = (): SpecialDate[] => {
  const year = getCurrentYear();
  return [
    { date: `${year}-03-15`, title: "Our First Date Anniversary", description: `Celebrating the day our journey began in ${year}!`, icon: Star },
    { date: `${year}-08-22`, title: "Partner's Birthday", description: `A special day for my special someone in ${year}!`, icon: Gift },
    { date: `${year}-12-25`, title: "Christmas Together", description: `Cozy holidays and warm memories in ${year}.`, icon: Gift },
    { date: `${year+1}-01-01`, title: "New Year's Day", description: "First day of a new year together!", icon: Star },
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
            Our Special Calendar
        </h1>
        <p className="text-lg text-muted-foreground">Never miss a moment that matters to us.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <Card className="shadow-lg w-full lg:max-w-md">
          <CardContent className="p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-card w-full"
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
              {date ? format(date, "PPP") : "Select a Date"}
            </CardTitle>
            <CardDescription>
              {selectedEvents.length > 0 ? "Here's what's special today:" : "No special events for this day."}
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
                {date ? "No special occasions marked for this date. Maybe plan something lovely?" : "Click on a date in the calendar to see details."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
