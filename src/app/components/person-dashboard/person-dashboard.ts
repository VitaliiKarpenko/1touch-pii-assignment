import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../models/person.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { combineLatest, debounceTime, map, Observable, startWith, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { PiiTypesPipe } from '../../pipes/pii-types/pii-types.pipe';
import { DataSourceCountPipe } from '../../pipes/data-source-count/data-source-count.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PersonFilterPipe } from '../../pipes/person-filter/person-filter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { AllPiiTypesPipe } from '../../pipes/all-pii-types/all-pii-types.pipe';
import { PersonFilter, PersonFilterName, PersonFilterPiiTypes } from '../../models/person-filter.model';

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.html',
  styleUrls: ['./person-dashboard.scss'],
  providers: [PersonService],
  imports: [
    AsyncPipe,
    PiiTypesPipe,
    DataSourceCountPipe,
    PersonFilterPipe,
    AllPiiTypesPipe,
    JsonPipe,
    MatTableModule,
    // MatFormFieldModule,
    MatInputModule,
    // FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class PersonDashboard implements OnInit {
  persons$: Observable<Person[]>;
  displayedColumns = ['name', 'piiTypes', 'dataSources'];

  nameCtrl = new FormControl<PersonFilterName>(null);
  piiTypesCtrl = new FormControl<PersonFilterPiiTypes>(null);
  filter$: Observable<PersonFilter>;

  piiTypesOpts: string[] = [];

  constructor(private personService: PersonService) {
    this.persons$ = this.personService.persons$;

    this.filter$ = combineLatest([
      this.nameCtrl.valueChanges.pipe(debounceTime(500), startWith(this.nameCtrl.value)),
      this.piiTypesCtrl.valueChanges.pipe(startWith(this.piiTypesCtrl.value)),
    ])
      .pipe(
        map(([name, piiTypes]) => ({ name, piiTypes })),
      );
  }

  ngOnInit() {
    this.getPersons();
  }

  private getPersons() {
    this.personService.getAllPersons()
      .subscribe();
  }
}
