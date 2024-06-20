import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Seat } from '../model/seat';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Reservation } from '../model/reservation';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  selectedSeats: Seat[] = []; // Seat is a type I have defined
  showtime: string = ''; // Initialize to an empty string or a default value
  movieTitle: string = ''; // Initialize to an empty string or a default value
  reservationDetails: Reservation = { id: 0, movieTitle: '', showtime: '', seats: [''] }

  constructor(private reservationService: ReservationService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedSeats = this.reservationService.getSelectedSeats();
    this.reservationDetails.seats = this.selectedSeats.map(seat => seat.id);
    this.movieTitle = this.route.snapshot.queryParams['movieId'] || '';
    this.showtime = this.route.snapshot.queryParams['showtime'] || '';
    this.reservationDetails.movieTitle = this.route.snapshot.queryParams['movieId'] || '';
    this.reservationDetails.showtime = this.route.snapshot.queryParams['showtime'] || '';
    // Now you can use movieId and showtime as needed
  }

   // Method to call confirmReservation from the service
   confirm(): void {
    this.reservationService.confirmReservation(this.reservationDetails).subscribe({
      next: (response) => {
        console.log('Confirmation successful', response)
        Swal.fire({
          title: 'Success!',
          text: `Reservation confirmed successfully! showtime ${this.reservationDetails.showtime}`,
          icon: 'success'
        });
        // Assuming you have a way to navigate back to the home page or another component
        this.generatePDF();
        this.router.navigate(['/movies']);
      },
      error: (error) => console.error('Confirmation failed', error)
    });
  }   

    editSelection(): void {
      // Assuming you have a way to navigate back to the selection page or component
      // This could be using Angular's Router or another method depending on your app's structure
      this.reservationDetails.seats = []
      this.router.navigate([`/seat-selection/${this.reservationDetails.movieTitle}/${this.reservationDetails.showtime}`]);
    }

    generatePDF(): void {
      const doc = new jsPDF();
    
      // Add content to the PDF
      doc.text('Reservation Summary', 10, 10);
      doc.text(`Movie Title: ${this.movieTitle}`, 10, 20);
      doc.text(`Showtime: ${this.showtime}`, 10, 30);
      doc.text('Seats: ' + this.selectedSeats.map(seat => seat.id).join(', '), 10, 40);
    
      // Save the PDF
      doc.save('reservation-summary.pdf');
    }
  
}