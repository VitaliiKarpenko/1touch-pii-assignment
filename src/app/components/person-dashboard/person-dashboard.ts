import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person/person.service';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PiiTypesPipe } from '../../pipes/pii-types/pii-types.pipe';
import { DataSourceCountPipe } from '../../pipes/data-source-count/data-source-count.pipe';
import { PersonFilterPipe } from '../../pipes/person-filter/person-filter.pipe';
import { SearchPersonForm } from './search-person-form/search-person-form';
import { PropertyList } from '../../shared/property-list/property-list';

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.html',
  styleUrls: ['./person-dashboard.scss'],
  providers: [PersonService],
  imports: [
    SearchPersonForm,
    PropertyList,
    AsyncPipe,
    PiiTypesPipe,
    DataSourceCountPipe,
    PersonFilterPipe,
    MatTableModule,
  ],
})
export class PersonDashboard implements OnInit {
  displayedColumns = ['name', 'piiTypes', 'dataSources'];
  piiTypesOpts: string[] = [];

  constructor(public personService: PersonService) {}

  ngOnInit() {
    this.getPersons();
  }

  private getPersons() {
    this.personService.getAllPersons()
      .subscribe();
  }
}
