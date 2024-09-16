import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { ReservationSummaryComponent } from './reservation-summary/reservation-summary.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'seat-selection/:movieId/:showtime', component: SeatSelectionComponent, canActivate: [AuthGuard]},
  { path: 'reservation-summary', component: ReservationSummaryComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' } // Redirect to movies list as the default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
