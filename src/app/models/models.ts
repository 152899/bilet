export interface SearchCriteria {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  serviceClass: string;
}

export interface SelectFlightCriteria {
  offerId: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  serviceClass: string;
}
