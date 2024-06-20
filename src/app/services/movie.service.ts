import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = `https://www.omdbapi.com/?i=tt3896198&apikey=${environment.omdbApiKey}`;

  private movies: Movie[] = [
    { id: 1, title: 'Movie 1', duration: 120, showtimes: ['10:00', '14:00', '18:00'] },
    // Add more movies
  ];

  constructor(private http: HttpClient) { }

  getMovies(): Movie[] {
    console.log(this.http.get(this.apiUrl).subscribe((data) => {
      console.log(data);
    }));  
    return this.movies;
  }

  getMoviesOMDB(): Observable<any> {
    return this.http.get(this.apiUrl);  
  }

  getMoviePoster(poster: string): Observable<any> {
    return this.http.get(poster);  
  }
}