import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { SearchCriteria } from '../models/models';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  private searchCriteria: SearchCriteria;
  flights = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.searchCriteria = data.searchCriteria;
      this.flights = this.apiService.search(this.searchCriteria);
    });
  }

  selectFlight(flight: any): void {
    const url = `/select-flight` +
      `/${flight.offerId}` +
      `/${this.searchCriteria.departureAirport}` +
      `/${this.searchCriteria.arrivalAirport}` +
      `/${this.searchCriteria.departureDate}` +
      `/${this.searchCriteria.returnDate}` +
      `/${this.searchCriteria.adults}` +
      `/${this.searchCriteria.children}` +
      `/${this.searchCriteria.serviceClass}`
    ;

    this.router.navigate([url]);
  }
}
