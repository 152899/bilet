import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchCriteriaResolver } from './resolver/search-criteria.resolver';
import { SelectFlightComponent } from './select-flight/select-flight.component';
import { SelectFlightCriteriaResolver } from './resolver/select-flight-criteria.resolver';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './api/api.service';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultsComponent,
    SelectFlightComponent,
    BookingConfirmationComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    SearchCriteriaResolver,
    SelectFlightCriteriaResolver,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
