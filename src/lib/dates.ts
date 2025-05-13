
import type { SpecialDate } from '@/types/dates';
import { format, getMonth } from 'date-fns'; // Added getMonth import
import { Star, Cake, Gift } from 'lucide-react';

/**
 * Generates a list of special dates for a specific year.
 * Includes recurring monthly anniversaries and specific annual birthdays.
 *
 * @param year The year for which to generate the special dates.
 * @returns An array of SpecialDate objects.
 */
export const getSpecialDatesForYear = (year: number): SpecialDate[] => {
  const specialDates: SpecialDate[] = [];

  // Note: Monthly anniversaries are handled differently in the component now
  // to avoid duplicates when filtering. We don't need to generate 12 here.
  // A single representative one could be added if needed elsewhere, but the
  // component logic now checks `date.getDate() === 19`.

  // ---- Specific Annual Dates ----

  // 1. Cumple de mi Emi on August 4th
  try {
    const emiBday = new Date(year, 7, 4); // Month is 0-indexed (7 = August)
    if (getMonth(emiBday) === 7) { // Ensure date is valid (e.g., handles Feb 29)
        specialDates.push({
            date: format(emiBday, 'yyyy-MM-dd'),
            title: "Cumple de mi Emi",
            description: `¡Feliz cumpleaños a mi persona especial, Emi, en ${year}!`,
            icon: Cake,
          });
    }
  } catch (e) {
      console.error("Error creating Emi's birthday date:", e);
  }


  // 2. Cumple de Mathi on February 28th
  try {
      const mathiBday = new Date(year, 1, 28); // Month is 0-indexed (1 = February)
       if (getMonth(mathiBday) === 1) { // Ensure date is valid
           specialDates.push({
               date: format(mathiBday, 'yyyy-MM-dd'),
               title: "Cumple de Mathi",
               description: `¡Celebrando a Mathi en su día especial en ${year}!`,
               icon: Gift,
             });
       }
  } catch (e) {
      console.error("Error creating Mathi's birthday date:", e);
  }


  // --- Example: Placeholder for a fixed anniversary (if needed) ---
  // const fixedAnniversary = new Date(year, 9, 19); // October 19th
  // specialDates.push({
  //   date: format(fixedAnniversary, 'yyyy-MM-dd'),
  //   title: "Aniversario Especial Fijo",
  //   description: `Nuestro aniversario fijo en ${year}.`,
  //   icon: Heart,
  // });

  return specialDates;
};
