import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchCriteria } from '../models/models';
import { ApiService } from '../api/api.service';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: 'booking-confirmation.component.html',
})
export class BookingConfirmationComponent implements OnInit {
  bookingData = null;
  weatherdata = null;
  exchange = null;
  rateeur = null;
  rateusd = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.bookingData = this.apiService.getBookingData(); 
    const arrival = this.bookingData.offer.segments[0].arrival; 
    let city_id = null;
    if (arrival == 'WAW'){
       city_id = 756135;
    } else if (arrival == 'JFK'){
      city_id = 5128581;
    } else if (arrival == 'CDG'){
      city_id = 6455259;
    }
    const link = `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=bd80bfbea3060030103cb1e0f79292d3&units=metric`;
    this.http.get(link).subscribe((weatherdata: any) => {
      this.weatherdata = weatherdata;
      console.log(weatherdata);
  });
  this.http.get('https://api.nbp.pl/api/exchangerates/tables/A/?format=json').subscribe((exchange: any) => {
    this.exchange = exchange;
    const exchangeTable = exchange[0].rates; 
    console.log(exchangeTable);
    for(const currencyDate of exchangeTable){
      if (currencyDate.code == 'USD'){
        this.rateusd = currencyDate.mid;
      }
      else if (currencyDate.code == 'EUR'){
        this.rateeur = currencyDate.mid;
      }
    }
    
});
  }
}

