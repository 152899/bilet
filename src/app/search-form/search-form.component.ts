import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.searchForm = this.buildSearchForm();
  }

  buildSearchForm(): FormGroup {
    return this.formBuilder.group({
      departureAirport: ['KTW', Validators.required],
      arrivalAirport: ['WAW', Validators.required],
      departureDate: ['2020-08-01', Validators.required],
      returnDate: ['2020-08-08', Validators.required],
      adults: '1',
      children: '0',
      serviceClass: ['economy', Validators.required],
    });
  }

  searchFlights(): void {
    const url = `/search-flights` +
      `/${this.searchForm.value.departureAirport}` +
      `/${this.searchForm.value.arrivalAirport}` +
      `/${this.searchForm.value.departureDate}` +
      `/${this.searchForm.value.returnDate}` +
      `/${this.searchForm.value.adults}` +
      `/${this.searchForm.value.children}` +
      `/${this.searchForm.value.serviceClass}`
    ;

    this.router.navigate([url]);
  }
}
