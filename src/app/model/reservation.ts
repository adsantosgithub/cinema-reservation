export interface Reservation {
    id: number;
    movieTitle: string;
    showtime: string;
    seats: string[]; // e.g., ["A1", "A2"]
  }