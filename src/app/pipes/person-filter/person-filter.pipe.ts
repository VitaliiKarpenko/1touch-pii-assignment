import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonFilter } from '../../models/person-filter.model';

@Pipe({
  name: 'personFilter'
})
export class PersonFilterPipe implements PipeTransform {

  transform(value: Person[], filter: PersonFilter): Person[] {
    if (!filter.name && !filter.piiTypes?.length) {
      return value;
    }

    const normilizedNameFilter = filter.name?.trim().toLowerCase() || '';
    return value.filter(({ name, pii }) => {
      return name.toLowerCase().includes(normilizedNameFilter) &&
        (
          !filter.piiTypes?.length ||
          this.isPersonHasPii(pii, filter.piiTypes)
        );
      }
    );
  }

  private isPersonHasPii(personPii: Record<string, string[]>, piiFilter: string[]): boolean {
    const piiTypes = Object.keys(personPii)
    return piiTypes.some((piiType) => piiFilter.includes(piiType));
  }
}
