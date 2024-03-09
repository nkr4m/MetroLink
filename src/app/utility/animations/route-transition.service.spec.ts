import { TestBed } from '@angular/core/testing';

import { RouteTransitionService } from './route-transition.service';

describe('RouteTransitionService', () => {
  let service: RouteTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
