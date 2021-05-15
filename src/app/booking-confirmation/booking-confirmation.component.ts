import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchCriteria } from '../models/models';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: 'booking-confirmation.component.html',
})
export class BookingConfirmationComponent implements OnInit {
  bookingData = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.http.get(this.apiUrl + '/' + params.bookingId).subscribe((bookingData: any) => {
    //     this.bookingData = bookingData;
    //   });
    // });

    this.bookingData = this.apiService.getBookingData();
  }

}
