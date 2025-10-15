import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PersonDashboard } from './person-dashboard';
import { PersonService } from '../services/person.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { selectFilteredPersonTableData } from '../../../store/persons/persons.selectors';
import { selectPersonStatistic } from '../../../store/statistic/statistic.selectors';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { PersonTableData } from '../models/person.model';
import { of } from 'rxjs';

describe('PersonDashboard', () => {
  const mockPersons: PersonTableData[] = [
    { id: 123, name: 'Test User1', piiTypes: 'email, phone', dataSources: 3 },
    { id: 2, name: 'Test User2', piiTypes: 'email, test_pii', dataSources: 5 },
    { id: 1000, name: 'Test User3', piiTypes: 'email, some_pii', dataSources: 0 },
  ];

  let component: PersonDashboard;
  let fixture: ComponentFixture<PersonDashboard>;
  let personServiceSpy: jasmine.SpyObj<any>;
  let storeSpy: jasmine.SpyObj<any>;
  let routerSpy: jasmine.SpyObj<any>;
  let routeStub: any;

  beforeEach(waitForAsync(() => {
    personServiceSpy = jasmine.createSpyObj('PersonService', ['getAllPersons']);
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routeStub = { children: [] };

    TestBed.overrideProvider(PersonService, { useValue: personServiceSpy });

    TestBed.configureTestingModule({
      imports: [PersonDashboard],
      providers: [
        provideHttpClientTesting(),
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // Setup spy before component creation and initialization
    if (personServiceSpy.getAllPersons) {
      personServiceSpy.getAllPersons.and.returnValue({
        subscribe: (): PersonTableData[] => mockPersons,
      });
    }
    fixture = TestBed.createComponent(PersonDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPersons on ngOnInit', () => {
    fixture.detectChanges();
    expect(personServiceSpy.getAllPersons).toHaveBeenCalled();
  });

  it('should call personService.getAllPersons when refresh btn is clicked', () => {
    if (personServiceSpy.getAllPersons) {
      personServiceSpy.getAllPersons.calls.reset();
    }
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('#refresh_data_btn'))?.nativeElement;
    btn?.click();
    expect(personServiceSpy.getAllPersons).toHaveBeenCalled();
  });

  it('should call navigate method with an appropriate id', () => {
    component.filteredPersons$ = of(mockPersons);
    fixture.detectChanges();
    const secondDetailBtn: HTMLButtonElement = fixture.debugElement.query(By.css('#detail_btn_1'))?.nativeElement;
    secondDetailBtn?.click();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith([mockPersons[1].id], { relativeTo: routeStub });
  });

  it('should select filteredPersons$ from store', () => {
    component.filteredPersons$;
    expect(storeSpy.select).toHaveBeenCalledWith(selectFilteredPersonTableData);
  });

  it('should select personStatistic$ from store', () => {
    component.personStatistic$;
    expect(storeSpy.select).toHaveBeenCalledWith(selectPersonStatistic);
  });
});
