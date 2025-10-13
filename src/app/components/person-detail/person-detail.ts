import { Component, OnInit } from '@angular/core';
import { PropertyList } from '../../shared/property-list/property-list';
import { PersonService } from '../../services/person/person.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../../models/person.model';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.html',
  styleUrls: ['./person-detail.scss'],
  imports: [
    PropertyList,
  ]
})
export class PersonDetail implements OnInit {
  person: Person;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.personService.getPersonById(+this.route.snapshot.params['id'])
      .pipe(
        filter((person) => !!person),
        take(1),
      )
      .subscribe(person => this.person = person);
  }
}
