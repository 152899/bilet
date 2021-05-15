import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    weatherdata = null;
    date = Date.now();
  constructor(
    private http: HttpClient
  ) {}
  ngOnInit(): void {
          this.http.get("http://api.openweathermap.org/data/2.5/weather?id=3096472&appid=bd80bfbea3060030103cb1e0f79292d3&units=metric").subscribe((weatherdata: any) => {
        this.weatherdata = weatherdata;
        console.log(weatherdata)
      });;
}
}
  
 


