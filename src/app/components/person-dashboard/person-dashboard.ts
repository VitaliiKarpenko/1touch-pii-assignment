import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SearchPersonForm } from './search-person-form/search-person-form';
import { PropertyList } from '../../shared/property-list/property-list';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PersonService } from '../../services/person/person.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PersonStatistic } from '../../models/statistic.model';
import { selectPersonStatistic } from '../../store/statistic/statistic.selectors';
import { PersonTableData } from '../../models/person.model';
import { selectFilteredPersonTableData } from '../../store/persons/persons.selectors';

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.html',
  styleUrls: ['./person-dashboard.scss'],
  providers: [PersonService],
  imports: [
    SearchPersonForm,
    PropertyList,
    AsyncPipe,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterOutlet,
  ],
})
export class PersonDashboard implements OnInit {
  displayedColumns = ['name', 'piiTypes', 'dataSources', 'actions'];
  filteredPersons$: Observable<PersonTableData[]> = this.store.select(selectFilteredPersonTableData);
  personStatistic$: Observable<PersonStatistic> = this.store.select(selectPersonStatistic);

  constructor(
    public personService: PersonService,
    private store: Store,
    public route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getPersons();
  }

  goToDetail(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  private getPersons() {
    this.personService.getAllPersons()
      .subscribe();
  }
}
