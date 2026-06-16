/**
 * Display-only status derived on the client from the session's backend status
 * (`PLANNED` / `COMPLETED` / `CANCELLED`) and the current time.
 */
export type ClassDisplayStatus = 'cancelled' | 'completed' | 'ongoing' | 'upcoming';
