import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Person } from '../../models/person.model';
import { Store } from '@ngrx/store';
import { selectAllPersons } from '../../store/persons/persons.selectors';
import { updatePersons } from '../../store/persons/persons.reducer';

@Injectable()
export class PersonService {
  public persons$: Observable<Person[]> = this.store.select(selectAllPersons);

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>('/assets/piis.json')
      .pipe(
        tap(persons => this.store.dispatch(updatePersons({ persons }))),
      );
  }

  getPersonById(id: number): Observable<Person | undefined> {
    return this.persons$
      .pipe(
        map((persons) => persons.find((person) => person.id === id)),
      );
  }
}
