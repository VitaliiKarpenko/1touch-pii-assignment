import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PersonDetail } from './person-detail';

describe('PersonDetail', () => {
  let component: PersonDetail;
  let fixture: ComponentFixture<PersonDetail>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDetail ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
