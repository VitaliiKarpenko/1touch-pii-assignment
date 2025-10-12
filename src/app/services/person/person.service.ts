import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Person } from '../../models/person.model';

@Injectable()
export class PersonService {
  private _persons$ = new BehaviorSubject<Person[]>([]);
  public persons$ = this._persons$.asObservable();

  constructor(private http: HttpClient) { }

  get persons(): Person[] {
    return this._persons$.value;
  }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>('/assets/piis.json')
      .pipe(tap(persons => this._persons$.next(persons)));
  }
}
