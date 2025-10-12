import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../models/person.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { PiiTypesPipe } from '../../pipes/pii-types/pii-types.pipe';
import { DataSourceCountPipe } from '../../pipes/data-source-count/data-source-count.pipe';

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.html',
  styleUrls: ['./person-dashboard.scss'],
  providers: [PersonService],
  imports: [
    AsyncPipe,
    PiiTypesPipe,
    DataSourceCountPipe,
    MatTableModule,
  ],
})
export class PersonDashboard implements OnInit {
  persons$: Observable<Person[]>;
  displayedColumns = ['name', 'piiTypes', 'dataSources'];

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
