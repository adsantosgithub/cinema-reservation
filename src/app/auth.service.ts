import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  verifyMovieAndShowTime(movie: string, showtime: string): boolean {
    // Implement your seat logic here
    // For simplicity, assume select seat is successful if movie and showtime are not null
    if (movie !== null && showtime !== null) {
      sessionStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
  }
}