import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchCriteriaResolver } from './resolver/search-criteria.resolver';
import { SelectFlightComponent } from './select-flight/select-flight.component';
import { SelectFlightCriteriaResolver } from './resolver/select-flight-criteria.resolver';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'search-flights/:departureAirport/:arrivalAirport/:departureDate/:returnDate/:adults/:children/:serviceClass',
    component: SearchResultsComponent,
    resolve: {
      searchCriteria: SearchCriteriaResolver
    }
  },
  {
    path: 'select-flight/:offerId/:departureAirport/:arrivalAirport/:departureDate/:returnDate/:adults/:children/:serviceClass',
    component: SelectFlightComponent,
    resolve: {
      selectFlightCriteria: SelectFlightCriteriaResolver
    }
  },
  {
    path: 'booking-confirmation/:bookingId',
    component: BookingConfirmationComponent
  },
  {
    path: '',
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
