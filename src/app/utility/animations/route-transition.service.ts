// src/app/route-transition.service.ts
import { Injectable } from '@angular/core';
import { trigger, transition, query, style, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class RouteTransitionService {
  static getRouteTransition() {
    return trigger('routeTransition', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({ position: 'fixed', width: '100%' }),
        ], { optional: true }), // Add optional: true to both :enter and :leave queries
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(30px)' }),
        ], { optional: true }),
        query(':leave', animate('100ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 })), { optional: true }),
        query(':enter', animate('400ms ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 })), { optional: true }),
      ]),
    ]);
  }
}
