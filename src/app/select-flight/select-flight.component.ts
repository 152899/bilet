import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectFlightCriteria } from '../models/models';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.scss']
})
export class SelectFlightComponent implements OnInit {

  flight = null;
  selectFlightCriteria: SelectFlightCriteria;
  bookingForm: FormGroup;
  submitted = false;
  seats = [];
  selectedSeats = [];

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.selectFlightCriteria = data.selectFlightCriteria;
      this.flight = this.apiService.select(this.selectFlightCriteria);
      this.buildForm(this.selectFlightCriteria);

      let seatNumber = 1;
      for (let i = 0; i < this.flight.seats.rows; i++) {
        const seatsInRow = [];
        for (let j = 0; j < this.flight.seats.cols; j++) {
          seatsInRow.push(seatNumber);
          seatNumber++;
        }
        this.seats.push(seatsInRow);
      }
    });
  }

  get formControls(): any {
    return this.bookingForm.controls;
  }

  get adultsFormArray(): any {
    return this.formControls.adults as FormArray;
  }

  get youthsFormArray(): any {
    return this.formControls.youths as FormArray;
  }

  get childrenFormArray(): any {
    return this.formControls.children as FormArray;
  }

  get infantsFormArray(): any {
    return this.formControls.infants as FormArray;
  }

  private buildForm(selectFlightCriteria: SelectFlightCriteria): void {
    this.bookingForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      cabinBaggage: [false],
      registeredBaggage: [false],
      adults: new FormArray([]),
      children: new FormArray([]),
    });

    for (let i = 0; i < selectFlightCriteria.adults; i++) {
      this.adultsFormArray.push(this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        documentNumber: ['', Validators.required]
      }));
    }

    for (let i = 0; i < selectFlightCriteria.children; i++) {
      this.childrenFormArray.push(this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        documentNumber: ['', Validators.required]
      }));
    }
  }

  book(): void {
    this.submitted = true;

    if (this.bookingForm.invalid) {
      return;
    }

    const bookFlightData = {...this.bookingForm.value};
    bookFlightData.offerId = this.selectFlightCriteria.offerId;
    bookFlightData.adultsNumber = this.bookingForm.value.adults.length;
    bookFlightData.childrenNumber = this.bookingForm.value.children.length;
    bookFlightData.serviceClass = this.selectFlightCriteria.serviceClass;
    bookFlightData.selectedSeats = this.selectedSeats;
    bookFlightData.departureDate = this.selectFlightCriteria.departureDate;
    bookFlightData.returnDate = this.selectFlightCriteria.returnDate;

    console.log(bookFlightData);

    const bookingResponse = this.apiService.book(bookFlightData);
    if (bookingResponse.bookingId !== null) {
      const url = `/booking-confirmation` +
        `/${bookingResponse.bookingId}`;

      this.router.navigate([url]);
    }
  }

  selectSeat(seat: any): void {
    const paxesNumber = this.selectFlightCriteria.adults + this.selectFlightCriteria.children;
    if (this.selectedSeats.length < paxesNumber) {
      this.selectedSeats.push(seat);
    } else if (this.selectedSeats.includes(seat)) {
      const tmp = [];
      for (const selectedSeat of this.selectedSeats) {
        if (selectedSeat !== seat) {
          tmp.push(selectedSeat);
        }
      }
      this.selectedSeats = tmp;
    }

  }

  isSeatSelected(seat: any): boolean {
    return this.selectedSeats.includes(seat);
  }
}