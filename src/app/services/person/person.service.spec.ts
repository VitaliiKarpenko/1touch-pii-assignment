import { TestBed, inject } from '@angular/core/testing';
import { PersonService } from './person.service';

describe('PersonSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonService]
    });
  });

  it('should ...', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));
});
