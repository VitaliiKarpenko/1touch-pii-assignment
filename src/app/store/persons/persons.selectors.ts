import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Person, PersonDataSources, PersonTableData } from "../../components/person/models/person.model";
import { selectFilter } from "../filter/filter.selector";

export const selectAllPersons = createFeatureSelector<Person[]>('persons');

export const selectPersonTableData = createSelector(
  selectAllPersons,
  (persons) => persons.map<PersonTableData>((person) => {
      
    const piiTypes = Object.keys(person.pii).reduce((acc, piiType) => {
      if (!!person.pii[piiType]?.length) {
        acc.push(piiType);
      }
      return acc;
    }, [] as string[]);

    const dataSources = Object.keys(person.dataSources).reduce((acc, source) => {
      acc += person.dataSources[source as keyof PersonDataSources]?.length || 0;

      return acc;
    }, 0);

    return {
      id: person.id,
      name: person.name,
      piiTypes: piiTypes.sort().join(', '),
      dataSources,
    };
    }),
);

export const selectFilteredPersonTableData = createSelector(
  selectPersonTableData,
  selectFilter,
  (personTableData, filter): PersonTableData[] => {
    if (!filter.name && !filter.piiTypes?.length) {
      return personTableData;
    }

    const normilizedNameFilter = filter.name?.trim().toLowerCase() || '';
    return personTableData.filter(({ name, piiTypes }) => {
      return name.toLowerCase().includes(normilizedNameFilter) && 
        (
          !filter.piiTypes?.length ||
            filter.piiTypes.some((piiTypeFilter) => piiTypes.includes(piiTypeFilter))
        );
      }
    );
  },
);

export const selectPiiTypeOpts = createSelector(
  selectAllPersons,
  (persons): string[] => {
    if (!persons?.length) {
      return [];
    }

    const uniquePiiTypes = persons.reduce<string[]>((acc, person) => {
      for (const piiType in person.pii) {
        if (!acc.includes(piiType)) {
          acc.push(piiType);
        }
      }

      return acc;
    }, []);

    return uniquePiiTypes.sort();
  },
);

