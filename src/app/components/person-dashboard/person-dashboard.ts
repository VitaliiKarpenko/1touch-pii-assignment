import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../models/person.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.html',
  styleUrls: ['./person-dashboard.scss'],
  providers: [PersonService],
  imports: [AsyncPipe, JsonPipe]
})
export class PersonDashboard implements OnInit {
  persons$: Observable<Person[]>;

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
