import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PersonFilter, PersonFilterName, PersonFilterPiiTypes } from '../models/person-filter.model';
import { combineLatest, debounceTime, map, Observable, startWith, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { updateFilter } from '../../../store/filter/filter.reducer';
import { selectPiiTypeOpts } from '../../../store/persons/persons.selectors';
import { selectFilter } from '../../../store/filter/filter.selector';

@Component({
  selector: 'app-search-person-form',
  templateUrl: './search-person-form.html',
  styleUrls: ['./search-person-form.scss'],
  imports: [
    AsyncPipe,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class SearchPersonForm {
  piiTypesOpts$: Observable<string[]> = this.store.select(selectPiiTypeOpts);

  form = new FormGroup({
    name: new FormControl<PersonFilterName>(null),
    pii: new FormControl<PersonFilterPiiTypes>(null),
  });
  
  filterSignal = toSignal<PersonFilter>(
    combineLatest([
      this.name.valueChanges.pipe(debounceTime(500), startWith(this.name.value)),
      this.pii.valueChanges.pipe(startWith(this.pii.value)),
    ])
      .pipe(map(([name, pii]) => ({ name, pii }))),
  );

  constructor(private store: Store) {
    effect(() => {
      this.store.dispatch(updateFilter({ filter: this.filterSignal()! }))
    });

    this.store.select(selectFilter)
      .pipe(take(1))
      .subscribe(filter => this.form.reset(filter));
  }

  get name() {
    return this.form.controls.name;
  }

  get pii() {
    return this.form.controls.pii;
  }
}
