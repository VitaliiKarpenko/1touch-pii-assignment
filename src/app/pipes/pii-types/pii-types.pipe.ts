import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'piiTypes'
})
export class PiiTypesPipe implements PipeTransform {

  transform(value: Record<string, string[]>): string {
    const types = Object.keys(value).reduce((acc, type) => {
      if (!!value[type]?.length) {
        acc.push(type);
      }
      return acc;
    }, [] as string[]);

    return types.sort().join(', ')
  }
}
