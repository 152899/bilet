import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SearchCriteria } from '../models/models';

@Injectable({ providedIn: 'root' })
export class  SearchCriteriaResolver implements Resolve<SearchCriteria> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SearchCriteria {
    return {
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
