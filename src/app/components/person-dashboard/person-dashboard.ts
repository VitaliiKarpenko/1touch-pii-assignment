import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../models/person.model';
import { AsyncPipe } from '@angular/common';
import { delay, Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { PiiTypesPipe } from '../../pipes/pii-types/pii-types.pipe';
import { DataSourceCountPipe } from '../../pipes/data-source-count/data-source-count.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NameFilterPipe } from '../../pipes/name-filter/name-filter.pipe';

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.html',
  styleUrls: ['./person-dashboard.scss'],
  providers: [PersonService],
  imports: [
    AsyncPipe,
    PiiTypesPipe,
    DataSourceCountPipe,
    NameFilterPipe,
    MatTableModule,
    // MatFormFieldModule,
    MatInputModule,
    // FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PersonDashboard implements OnInit {
  persons$: Observable<Person[]>;
  displayedColumns = ['name', 'piiTypes', 'dataSources'];
  nameCtrl = new FormControl(null);
  nameSearch$ = this.nameCtrl.valueChanges.pipe(delay(500));

  constructor(private personService: PersonService) {
    this.persons$ = this.personService.persons$;
  }

  ngOnInit() {
    this.getPerons();
  }

  private getPerons() {
    this.personService.getAllPersons()
      .subscribe();
  }

}
