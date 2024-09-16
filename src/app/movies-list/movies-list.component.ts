import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/movie';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  posterUrl: string = '';

  constructor(private movieService: MovieService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    //this.movies = this.movieService.getMovies();
    this.movieService.getMoviesOMDB().subscribe({ 
      next: (response) => {
        let movie: Movie = { id: 0, title: '', duration: 0, showtimes: [] };
        // Assuming 'response' contains the data to populate the 'movie' object
        // You might need to adjust the assignments based on the actual structure of 'response'
        movie.title = response.Title;
        movie.duration = response.Runtime;
        this.posterUrl = response.Poster;
        movie.showtimes = ['4:00 PM', '7:00 PM', '10:00 PM']; // Example showtimes
  
        this.movies.push(movie);
      },
      error: (error) => console.error('Error fetching movies', error)
    });
  }

  selectShowtime(movie: Movie, time: string): void {

    if(this.authService.verifyMovieAndShowTime(movie.title, time)) {
      // Navigate to seat-selection component with selected movie and showtime
      // This could involve using Angular Router and passing data via route parameters or a shared service
      this.router.navigate(['/seat-selection', movie.title, time]);
    }
  }
}