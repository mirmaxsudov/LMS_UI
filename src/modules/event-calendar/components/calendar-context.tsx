import type { ReactNode } from 'react';

import React, { createContext, useState } from 'react';

interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function useCalendarContext() {
  const context = React.use(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const value = { currentDate, setCurrentDate };

  return <CalendarContext value={value}>{children}</CalendarContext>;
};
