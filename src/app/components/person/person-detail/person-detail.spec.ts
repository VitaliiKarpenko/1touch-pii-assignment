import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PersonDetail } from './person-detail';
import { PersonService } from '../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PersonDetail', () => {
  let component: PersonDetail;
  let fixture: ComponentFixture<PersonDetail>;
  let personServiceSpy: jasmine.SpyObj<any>;
  let routerSpy: jasmine.SpyObj<any>;
  let routeStub: any;

  beforeEach(waitForAsync(() => {
    personServiceSpy = jasmine.createSpyObj('PersonService', ['getPersonById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routeStub = {
      snapshot: { params: { id: '42' } }
    };

    TestBed.configureTestingModule({
      imports: [PersonDetail],
      providers: [
        provideHttpClientTesting(),
        { provide: PersonService, useValue: personServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    personServiceSpy.getPersonById.and.returnValue(of({}));
    fixture = TestBed.createComponent(PersonDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPersonById with route param id', () => {
    expect(personServiceSpy.getPersonById).toHaveBeenCalledWith(42);
  });

  it('should navigate to dashboard on back btn click', () => {
    const backBtn: HTMLButtonElement = fixture.debugElement.query(By.css('#back_btn'))?.nativeElement;
    backBtn?.click();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
