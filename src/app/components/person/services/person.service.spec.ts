import { TestBed } from '@angular/core/testing';
import { PersonService } from './person.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePersons } from '../../../store/persons/persons.reducer';

describe('PersonService', () => {
    const mockPersons = [
    {
      id: 1,
      name: 'A',
      pii: {},
      dataSources: {
        documents: [],
        databases: [],
        emails: [],
        chats: [],
      }
    },
    {
      id: 2,
      name: 'B',
      pii: {},
      dataSources: {
        documents: [],
        databases: [],
        emails: [],
        chats: [],
      }
    },
  ];

  let service: PersonService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    TestBed.configureTestingModule({
      providers: [
        PersonService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: Store, useValue: storeSpy },
      ],
    });
    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllPersons should call http.get and dispatch updatePersons', () => {
    httpSpy.get.and.returnValue(of(mockPersons));
    storeSpy.dispatch.and.stub();
    service.getAllPersons().subscribe(result => {
      expect(result).toEqual(mockPersons);
      expect(httpSpy.get).toHaveBeenCalledWith('/assets/piis.json');
      expect(storeSpy.dispatch).toHaveBeenCalledWith(updatePersons({ persons: mockPersons }));
    });
  });

  it('getPersonById should select from store and retrieve person', () => {
    storeSpy.select.and.returnValue(of(mockPersons));
    (service as any).persons$ = of(mockPersons);
    service.getPersonById(2).subscribe(result => {
      expect(result).toEqual(mockPersons[1]);
    });
  });
});
