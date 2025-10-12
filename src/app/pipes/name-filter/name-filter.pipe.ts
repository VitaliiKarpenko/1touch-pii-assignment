import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../../models/person.model';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(value: Person[], filter?: string | null): Person[] {
    if (!filter) {
      return value;
    }

    const normilizedFilter = filter.trim().toLowerCase();
    return value.filter(({ name }) => name.toLowerCase().includes(normilizedFilter));
  }
}
