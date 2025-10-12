import { Pipe, PipeTransform } from '@angular/core';
import { PersonDataSources } from '../../models/person.model';

@Pipe({
  name: 'dataSourceCount'
})
export class DataSourceCountPipe implements PipeTransform {

  transform(value: PersonDataSources): number {
    return Object.keys(value).reduce((acc, source) => {
      acc += value[source as keyof PersonDataSources]?.length || 0;

      return acc;
    }, 0);
  }
}
