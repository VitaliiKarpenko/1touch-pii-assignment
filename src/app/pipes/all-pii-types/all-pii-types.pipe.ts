import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../../models/person.model';

@Pipe({
  name: 'allPiiTypes'
})
export class AllPiiTypesPipe implements PipeTransform {

  transform(value: Person[]): string[] {
    const uniquePiiTypes = value.reduce<string[]>((acc, person) => {
      for (const piiType in person.pii) {
        if (!acc.includes(piiType)) {
          acc.push(piiType);
        }
      }

      return acc;
    }, []);

    return uniquePiiTypes.sort();
  }
}
