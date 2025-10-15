import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { SearchPersonForm } from './search-person-form';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { selectPiiTypeOpts } from '../../../store/persons/persons.selectors';
import { updateFilter } from '../../../store/filter/filter.reducer';

describe('SearchPersonForm', () => {
  let component: SearchPersonForm;
  let fixture: ComponentFixture<SearchPersonForm>;
  let storeSpy: jasmine.SpyObj<any>;

  beforeEach(waitForAsync(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    storeSpy.select.and.returnValue(of([]));
    TestBed.configureTestingModule({
      imports: [SearchPersonForm],
      providers: [
        { provide: Store, useValue: storeSpy },
      ],
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

  it('should have form controls name and pii', () => {
    expect(component.form.contains('name')).toBeTrue();
    expect(component.form.contains('pii')).toBeTrue();
  });

  it('should select piiTypesOpts$ from store', () => {
    expect(storeSpy.select).toHaveBeenCalledWith(selectPiiTypeOpts);
  });

  it('should dispatch updateFilter when filterSignal changes', fakeAsync(() => {
    storeSpy.dispatch.calls.reset();
    component.form.controls.pii.setValue(['email']);
    fixture.detectChanges();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(updateFilter({ filter: { name: null, piiTypes: [ 'email' ] } }));
    

    storeSpy.dispatch.calls.reset();
    component.form.controls.name.setValue('test');
    fixture.detectChanges();

    // Wait for effect to trigger
    tick(600);
    fixture.detectChanges();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(updateFilter({ filter: { name: 'test', piiTypes: [ 'email' ] } }));
  }));
});
