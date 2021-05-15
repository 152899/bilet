import { Injectable } from '@angular/core';
import { SearchCriteria, SelectFlightCriteria } from '../models/models';

const KTW_WAW = [
  {
    'offerId': 'flight1',
    'airlineCode': 'LO',
    'segments': [
      {
        'departure': 'KTW',
        'arrival': 'WAW',
        'duration': '1:00'
      },
      {
        'departure': 'WAW',
        'arrival': 'KTW',
        'duration': '1:00'
      }
    ],
    'prices': {
      'adult': 100,
      'youth': 90,
      'child': 80,
      'infant': 50
    },
    'serviceClassFee': {
      'economy': '0',
      'business': '100'
    },
    'seats': {
      'rows': 10,
      'cols': 6
    },
    "seatPrice": 20,
    "cabinBaggage": 100,
    "registeredBaggage": 200
  }
];

const KTW_JFK = [
  {
    'offerId': 'flight3',
    'airlineCode': 'LH',
    'segments': [
      {
        'departure': 'KTW',
        'arrival': 'JFK',
        'duration': '9:00'
      },
      {
        'departure': 'JFK',
        'arrival': 'KTW',
        'duration': '9:00'
      }
    ],
    'prices': {
      'adult': 400,
      'youth': 300,
      'child': 200,
      'infant': 100
    },
    'serviceClassFee': {
      'economy': '0',
      'business': '500'
    },
    'seats': {
      'rows': 30,
      'cols': 9
    },
    "seatPrice": 50,
    "cabinBaggage": 100,
    "registeredBaggage": 500
  }
];

const KTW_CDG = [
  {
    'offerId': 'flight2',
    'airlineCode': 'W6',
    'segments': [
      {
        'departure': 'KTW',
        'arrival': 'CDG',
        'duration': '3:00'
      },
      {
        'departure': 'CDG',
        'arrival': 'KTW',
        'duration': '3:00'
      }
    ],
    'prices': {
      'adult': 200,
      'youth': 100,
      'child': 50,
      'infant': 10
    },
    'serviceClassFee': {
      'economy': '0',
      'business': '200'
    },
    'seats': {
      'rows': 20,
      'cols': 6
    },
    "seatPrice": 30,
    "cabinBaggage": 100,
    "registeredBaggage": 300
  }
];

@Injectable()
export class ApiService {

  search(searchCriteria: SearchCriteria): any {

    let availableOffers = [];

    if (searchCriteria.departureAirport === 'KTW' && searchCriteria.arrivalAirport === 'WAW') {
      availableOffers = KTW_WAW;
    } else  if (searchCriteria.departureAirport === 'KTW' && searchCriteria.arrivalAirport === 'CDG') {
      availableOffers = KTW_CDG;
    } else  if (searchCriteria.departureAirport === 'KTW' && searchCriteria.arrivalAirport === 'JFK') {
      availableOffers = KTW_JFK;
    }

    const offers = [];
    for (const availableOffer of availableOffers) {
      const offer = {...availableOffer};
      offer.totalPrice = this.calculateTotalPrice(
        offer,
        searchCriteria.adults,
        searchCriteria.children,
        searchCriteria.serviceClass
      );

      offers.push(offer);
    }

    return offers;
  }

  select(selectFlightCriteria: SelectFlightCriteria): any {
    let availableOffers = [];
    availableOffers = availableOffers.concat(KTW_WAW, KTW_CDG, KTW_JFK);

    const offer = availableOffers.find((availableOffer) => {
      return availableOffer.offerId === selectFlightCriteria.offerId;
    });

    let selectedOffer = null;

    if (offer) {
      const pricedOffer = {...offer};
      pricedOffer.totalPrice = this.calculateTotalPrice(
        pricedOffer,
        selectFlightCriteria.adults,
        selectFlightCriteria.children,
        selectFlightCriteria.serviceClass
      );

      selectedOffer = pricedOffer;
    }

    return selectedOffer;
  }

  book(bookFlightData: any): any {
    const now = Date.now();
    let bookingId = now;

    const offerId = bookFlightData.offerId;
    const adultsNumber = bookFlightData.adultsNumber;
    const childrenNumber = bookFlightData.childrenNumber;
    const serviceClass = bookFlightData.serviceClass;
    const hasCabinBaggage = bookFlightData.cabinBaggage;
    const hasRegisteredBaggage = bookFlightData.registeredBaggage;

    let availableOffers = [];
    availableOffers = availableOffers.concat(KTW_WAW, KTW_CDG, KTW_JFK);

    const offer = availableOffers.find((availableOffer) => {
      return availableOffer.offerId === offerId;
    });

    if (offer) {
      const totalPrice = this.calculateTotalPrice(
        offer,
        adultsNumber,
        childrenNumber,
        serviceClass,
        hasCabinBaggage,
        hasRegisteredBaggage,
        bookFlightData.selectedSeats
      );

      const booking = {...bookFlightData};
      booking.bookingId = now;
      booking.totalPrice = totalPrice;
      booking.offer = offer;

      localStorage.setItem('booking', JSON.stringify(booking));

    } else {
      bookingId = null;
    }

    return ({
      bookingId
    });
  }

  getBookingData(): any {
    const bookingData = localStorage.getItem('booking');
    if (bookingData) {
      return JSON.parse(bookingData);
    }

    return null;
  }

  private calculateTotalPrice(
    offer,
    adults,
    children,
    serviceClass,
    hasCabinBaggage = false,
    hasRegisteredBaggage = false,
    selectedSeats = []
  ): number {
    const paxes = adults + children;
    let totalPrice = 0;
    if (serviceClass === 'business') {
      totalPrice += paxes * offer.serviceClassFee.business;
    } else if (serviceClass === 'economy') {
      totalPrice += paxes * offer.serviceClassFee.economy;
    }
    totalPrice += adults * offer.prices.adult;
    totalPrice += children * offer.prices.child;

    if (hasCabinBaggage) {
      totalPrice += offer.cabinBaggage;
    }

    if (hasRegisteredBaggage) {
      totalPrice += offer.registeredBaggage;
    }

    totalPrice += selectedSeats.length * offer.seatPrice;

    return totalPrice;

  }
}
