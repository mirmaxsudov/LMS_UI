import { isSameDay } from 'date-fns';

/**
 * Sort events with multi-day events first, then by start time
 */

export function sort<T>(list: T[], sortCallback: (t1: T, t2: T) => number): T[] {
  return list.sort(sortCallback);
}

/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
export function getAllListForDay<T>(list: T[], day: Date, getDate: (item: T) => string): T[] {
  return list.filter((item) => {
    const value = getDate(item);
    return value ? isSameDay(day, value) : false;
  });
}
