import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SelectFlightCriteria } from '../models/models';

@Injectable({ providedIn: 'root' })
export class SelectFlightCriteriaResolver implements Resolve<SelectFlightCriteria> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SelectFlightCriteria {
    return {
      offerId: route.params.offerId,
      departureAirport: route.params.departureAirport,
      arrivalAirport: route.params.arrivalAirport,
      departureDate: route.params.departureDate,
      returnDate: route.params.returnDate,
      adults: parseInt(route.params.adults, 10),
      children: parseInt(route.params.children, 10),
      serviceClass: route.params.serviceClass,
    };
  }
}
