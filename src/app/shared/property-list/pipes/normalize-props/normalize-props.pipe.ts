import { Pipe, PipeTransform } from '@angular/core';
import { DisplayedProperty, NormalizedProperty, Properties } from '../../models/property-list.model';

@Pipe({
  name: 'normalizeProps'
})
export class NormalizePropsPipe implements PipeTransform {

  transform(
    properties: Properties,
    propsList: DisplayedProperty[],
    isSorting: boolean,
    compareFn: (a: DisplayedProperty, b: DisplayedProperty) => number,
  ): NormalizedProperty[] {
    if (!propsList?.length || !properties || !Object.keys(properties)?.length) {
      return [];
    }

    const normalizePropsList = [...propsList];
    this.sortPropsList(normalizePropsList, isSorting, compareFn);

    return this.normalizeProps(properties, normalizePropsList);
  }

  private sortPropsList(
    propsList: DisplayedProperty[],
    isSorting: boolean,
    compareFn: (a: DisplayedProperty, b: DisplayedProperty) => number
  ) {
    if (isSorting) {
      propsList.sort(compareFn);
    }

    return propsList;
  }

  private normalizeProps(
    properties: Properties,
    propsList: DisplayedProperty[],
  ): NormalizedProperty[] {
    return propsList.reduce<NormalizedProperty[]>((acc, prop) => {
      const propertyValue = properties[prop.property];
      if ((Array.isArray(propertyValue) && propertyValue.length)) {
        acc.push({ label: prop.label, value: propertyValue.map(value => `${value}`) });
      } else if (![null, undefined].includes(propertyValue)) {
        acc.push({ label: prop.label, value: [`${propertyValue}`] });
      }

      return acc;
    }, []);
  }
}
