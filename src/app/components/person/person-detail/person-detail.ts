import { Component } from '@angular/core';
import { PropertyList } from '../../../shared/property-list/property-list';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PersonService } from '../services/person.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.html',
  styleUrls: ['./person-detail.scss'],
  imports: [
    PropertyList,
    AsyncPipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class PersonDetail {
  person$ = this.personService.getPersonById(+this.route.snapshot.params['id']);

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
