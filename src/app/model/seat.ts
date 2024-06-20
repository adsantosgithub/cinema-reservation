export interface Seat {
  id: string;
  state: 'available' | 'selected' | 'reserved';
}