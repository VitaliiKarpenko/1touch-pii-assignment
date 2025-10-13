import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Person, PersonDataSources, PersonStatistic } from '../../models/person.model';

@Injectable()
export class PersonService {
  private _persons$ = new BehaviorSubject<Person[]>([]);
  public persons$ = this._persons$.asObservable();
  public statistics: PersonStatistic;

  constructor(private http: HttpClient) { }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>('/assets/piis.json')
      .pipe(
        tap(persons => this._persons$.next(persons)),
        tap(this.setStatistics.bind(this)),
      );
  }

  private setStatistics(persons: Person[]) {
    const { totalPiiItems, totalDataSources } = persons.reduce((acc, person) => {
      acc.totalPiiItems = Object.keys(person.pii).reduce((acc, piiType) => {
        acc += person.pii[piiType].length;
        return acc;
      }, acc.totalPiiItems);

      acc.totalDataSources = Object.keys(person.dataSources).reduce((acc, dataSource) => {
        acc += person.dataSources[<keyof PersonDataSources>dataSource].length;
        return acc;
      }, acc.totalDataSources);

      return acc;
    }, { totalPiiItems: 0, totalDataSources: 0 });

    this.statistics = {
      totalPiiItems,
      totalPersons: persons.length,
      averageDataSources: +(totalDataSources / persons.length).toFixed(2),
    };
  }
}
