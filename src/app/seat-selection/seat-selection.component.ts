import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seat } from '../model/seat';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../model/reservation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  movieId: string = '';
  showtime: string = '';
  rows: Seat[][] = [];
  reservationsFromServer: Reservation[] = [];

  constructor(private route: ActivatedRoute, 
              private reservationService: ReservationService,
              private router: Router) { }

  ngOnInit(): void {
    this.movieId =  this.route.snapshot.paramMap.get('movieId') || '';
    this.showtime = this.route.snapshot.paramMap.get('showtime') || '';
    this.initializeSeats();
  }

  initializeSeats(): void {

    this.reservationService.retriveReservationDetails().subscribe({
      next: (response) => {
        this.reservationsFromServer = response;
        // Use the response to update the seats availability
        this.rows = [];

        for (let i = 0; i < 5; i++) { // Example: 5 rows
          this.rows[i] = [];
          for (let j = 0; j < 8; j++) { // Example: 8 seats per row
    
          // Determine if the current seat is reserved
          const isReserved = this.reservationsFromServer.some(reservation => 
            reservation.seats.some(seat => 
            seat === `row-${i + 1} seat-${j + 1}` && reservation.showtime === this.showtime
          ));
    
          const seatState = isReserved ? 'reserved' : 'available';
          this.rows[i].push({ id: `row-${i + 1} seat-${j + 1}`, state: seatState });
          }
        }
        
      },
      error: (error) => console.error('Error retrieving reservation details', error)
    });
  }

  toggleSeatSelection(seat: Seat): void {
    if (seat.state === 'available') {
      seat.state = 'selected';
    } else if (seat.state === 'selected') {
      seat.state = 'available';
    }
    // Reserved seats cannot be toggled
  }

  navigateToSummary(): void {
    const selectedSeats = this.rows.flat().filter(seat => seat.state === 'selected');
    if (selectedSeats.length === 0) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please select at least one seat before proceeding.',
        icon: 'warning',
        timer: 5000,
        confirmButtonText: 'Ok'
      });
      return;
    }
    this.reservationService.setSelectedSeats(selectedSeats);
    this.router.navigate(['/reservation-summary'], { queryParams:{ movieId: this.movieId, showtime: this.showtime } });
  }

  editShowtime(): void {
    this.router.navigate([`/movies`]);
  }
}