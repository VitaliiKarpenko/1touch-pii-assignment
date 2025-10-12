import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../models/person.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.html',
  styleUrls: ['./person-dashboard.scss'],
  providers: [PersonService],
  imports: [AsyncPipe, MatTableModule],
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
