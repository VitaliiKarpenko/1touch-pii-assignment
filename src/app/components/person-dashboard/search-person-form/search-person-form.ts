import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AllPiiTypesPipe } from '../../../pipes/all-pii-types/all-pii-types.pipe';
import { PersonService } from '../../../services/person/person.service';
import { PersonFilterName, PersonFilterPiiTypes } from '../../../models/person-filter.model';
import { combineLatest, debounceTime, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-search-person-form',
  templateUrl: './search-person-form.html',
  styleUrls: ['./search-person-form.scss'],
  imports: [
    AllPiiTypesPipe,
    AsyncPipe,
    // MatFormFieldModule,
    MatInputModule,
    // FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class SearchPersonForm {
  form = new FormGroup({
    name: new FormControl<PersonFilterName>(null),
    pii: new FormControl<PersonFilterPiiTypes>(null),
  });
  
  filterSignal = toSignal(
    combineLatest([
      this.name.valueChanges.pipe(debounceTime(500), startWith(this.name.value)),
      this.pii.valueChanges.pipe(startWith(this.pii.value)),
    ])
      .pipe(map(([name, piiTypes]) => ({ name, piiTypes }))),
  );

  constructor(public personService: PersonService) {}

  get name() {
    return this.form.controls.name;
  }

  get pii() {
    return this.form.controls.pii;
  }
}
