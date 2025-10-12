import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchPersonForm } from './search-person-form';

describe('SearchPersonForm', () => {
  let component: SearchPersonForm;
  let fixture: ComponentFixture<SearchPersonForm>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPersonForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
