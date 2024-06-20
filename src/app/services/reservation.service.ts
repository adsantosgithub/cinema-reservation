import { Injectable } from '@angular/core';
import { Seat } from './../model/seat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
   
  private selectedSeats: Seat[] = [];

  constructor(private http: HttpClient) { }

  setSelectedSeats(seats: Seat[]): void {
    this.selectedSeats = seats;
  }

  getSelectedSeats(): Seat[] {
    return this.selectedSeats;
  }

  confirmReservation(reservationDetails: any): Observable<any> {
    return this.http.post(`${environment.apiUrlNodeJsExpress}/confirm`, reservationDetails);
  }

  retriveReservationDetails(): Observable<any> {
    return this.http.get(`${environment.apiUrlNodeJsExpress}/reservations`);
  }

  deleteReservations(): Observable<any> {
    return this.http.delete(`${environment.apiUrlNodeJsExpress}/deleteReservations`);
}
}